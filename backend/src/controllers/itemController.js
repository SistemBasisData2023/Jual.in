const db = require('../database/db');

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

// Create a new item
const createItem = async (req, res) => {
  const { name, description, price, category_id } = req.body;
  console.log(req.body);
  try {
    // Check if user has the admin role
    // if (req.user.role !== 'admin') {
    //   res.status(403).json({ error: 'Unauthorized: Only admins can create items' });
    //   return;
    // }

    const query = 'INSERT INTO Item (name, description, price, category_id) VALUES ($1, $2, $3, $4) RETURNING item_id';
    const values = [name, description, price, category_id];
    console.log(values);
    const result = await db.pool.query(query, values);

    const newItem = {
      item_id: result.rows[0].item_id,
      name,
      description,
      price,
      category_id,
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
  const { name, description, price, category_id } = req.body;

  try {
    // Check if user has the admin role
    // if (req.user.role !== 'admin') {
    //   res.status(403).json({ error: 'Unauthorized: Only admins can update items' });
    //   return;
    // }

    const query = 'UPDATE Item SET name = $1, description = $2, price = $3, category_id = $4 WHERE item_id = $5';
    const values = [name, description, price, category_id, id];
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
    // Check if user has the admin role
    // if (req.user.role !== 'admin') {
    //   res.status(403).json({ error: 'Unauthorized: Only admins can delete items' });
    //   return;
    // }

    const query = 'DELETE FROM Item WHERE item_id = $1';
    await db.pool.query(query, [id]);

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById,
};
