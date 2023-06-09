const db = require('../database/db');
const { storage } = require('../database/firebase');
const { ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");

// Get all items
const getAllItems = async (req, res) => {
  try {
    const query = 'SELECT * FROM Item';
    const result = await db.pool.query(query);

    const items = result.rows;
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM Item WHERE item_id = $1';
    const result = await db.pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    const item = result.rows[0];
    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve item' });
  }
};

// Create a new item with image upload
const createItem = async (req, res) => {
  const { name, description, price, category_id, quantity } = req.body;
  console.log(req.body);

  try {
    const image_url = await handleUpload(req, name); // Pass item name to handleUpload function

    console.log(image_url);

    const query = 'INSERT INTO Item (name, description, price, image_url, category_id, quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING item_id';
    const values = [name, description, price, image_url, category_id, quantity];
    const result = await db.pool.query(query, values);

    const newItem = {
      item_id: result.rows[0].item_id,
      name,
      description,
      price,
      image_url,
      category_id,
      quantity
    };

    res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

// Update item by ID
const updateItemById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category_id, quantity } = req.body;

  try {
    const query = 'UPDATE Item SET name = $1, description = $2, price = $3, image_url = $4, category_id = $5, quantity = $6 WHERE item_id = $7';
    const values = [name, description, price, image_url, category_id, quantity, id];
    await db.pool.query(query, values);

    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// Delete item by ID
const deleteItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM Item WHERE item_id = $1';
    await db.pool.query(query, [id]);

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

const testUpload = async (req, res) => {
  console.log("Halo")
  try {
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File successfully uploaded.');
    return res.send({
      message: 'file uploaded to firebase storage',
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const handleUpload = async (req, itemName) => {
  try {
    const dateTime = giveCurrentDateTime();

    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    const validExtensions = ['jpeg', 'jpg', 'png', 'gif'];

    if (!validExtensions.includes(fileExtension)) {
      throw new Error('Invalid image file format. Only JPEG, PNG, JPG, and GIF are allowed.');
    }

    const imageName = `${itemName}_${dateTime}.${fileExtension}`;

    const storageRef = ref(storage, `files/${imageName}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file to the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

    // Grab the public URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File successfully uploaded.');
    return downloadURL;
  } catch (error) {
    console.log("File upload failed");
    return;
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById,
  testUpload
};
