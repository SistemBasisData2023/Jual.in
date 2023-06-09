const db = require('../database/db');
const { storage } = require('../database/firebase');
const { ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { get } = require('../routes/reviewsRoutes');

const getAllItems = async (req, res) => {
  try {
    const query = `
      SELECT Item.*, Category.name AS category_name, ROUND(AVG(Reviews.rating), 1) AS average_rating, UserItem.user_id
      FROM Item
      INNER JOIN Category ON Item.category_id = Category.category_id
      LEFT JOIN Reviews ON Item.item_id = Reviews.item_id
      LEFT JOIN UserItem ON Item.item_id = UserItem.item_id
      GROUP BY Item.item_id, Category.name, UserItem.user_id
      ORDER BY Item.item_id;
    `;

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
    const query = `
      SELECT Item.*, Category.name AS category_name, ROUND(AVG(Reviews.rating), 1) AS average_rating
      FROM Item
      INNER JOIN Category ON Item.category_id = Category.category_id
      LEFT JOIN Reviews ON Item.item_id = Reviews.item_id
      WHERE Item.item_id = $1
      GROUP BY Item.item_id, Category.name
      ORDER BY Item.item_id;
    `;

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
  const { name, description, price, category_id, quantity, user_id } = req.body;

  try {
    const image_url = await handleUpload(req, name); // Pass item name to handleUpload function

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
      quantity,
      user_id
    };

    // Insert the user_id and item_id into UserItem table
    const userItemQuery = 'INSERT INTO UserItem (user_id, item_id) VALUES ($1, $2)';
    const userItemValues = [user_id, newItem.item_id];
    await db.pool.query(userItemQuery, userItemValues);

    res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

// Update item by ID
const updateItemById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category_id, quantity, user_id } = req.body;

  try {
    const image_url = await handleUpload(req, name); // Pass item name to handleUpload function

    const query = 'UPDATE Item SET name = $1, description = $2, price = $3, image_url = $4, category_id = $5, quantity = $6 WHERE item_id = $7';
    const values = [name, description, price, image_url, category_id, quantity, id];
    await db.pool.query(query, values);

    // Update the user_id in UserItem table
    const userItemQuery = 'UPDATE UserItem SET user_id = $1 WHERE item_id = $2';
    const userItemValues = [user_id, id];
    await db.pool.query(userItemQuery, userItemValues);

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

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const query = 'SELECT * FROM Category ORDER BY category_id';
    const result = await db.pool.query(query);
    const categories = result.rows;
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

const getItemsByCategory = async (req, res) => {
  const { name } = req.params;
  console.log(req.params);
  console.log(name)
  const category_name = name;

  try {
    const query = `
      SELECT Item.*, Category.name AS category_name, ROUND(AVG(Reviews.rating), 1) AS average_rating
      FROM Item
      INNER JOIN Category ON Item.category_id = Category.category_id
      LEFT JOIN Reviews ON Item.item_id = Reviews.item_id
      WHERE Category.name = $1
      GROUP BY Item.item_id, Category.name
      ORDER BY Item.item_id;
    `;

    const result = await db.pool.query(query, [category_name]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No items found in this category.' });
      return;
    }

    const items = result.rows;
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById,
  testUpload,
  getAllCategories,
  getItemsByCategory
};
