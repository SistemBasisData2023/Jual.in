const db = require('../database/db');

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const query = 'SELECT * FROM Transaction';
    const result = await db.pool.query(query);

    const transactions = result.rows;
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve transactions' });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM Transaction WHERE transaction_id = $1';
    const result = await db.pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const transaction = result.rows[0];
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve transaction' });
  }
};


// Create a new transaction
const createTransaction = async (req, res) => {
  const { user_id, total_amount, items } = req.body;
  console.log(req.body);
  try {
    // Insert transaction and retrieve transaction_id
    const transactionQuery = 'INSERT INTO Transaction (user_id, total_amount) VALUES ($1, $2) RETURNING transaction_id';
    const transactionValues = [user_id, total_amount];
    console.log(transactionValues);
    const transactionResult = await db.pool.query(transactionQuery, transactionValues);
    const transactionId = transactionResult.rows[0].transaction_id;

    // Insert items into Cart table with the transaction_id
    const cartQuery = 'INSERT INTO Cart (transaction_id, item_id, quantity) VALUES ($1, $2, $3)';
    for (const item of items) {
      const cartValues = [transactionId, item.item_id, item.quantity];
      console.log(cartValues);
      await db.pool.query(cartQuery, cartValues);
    }

    res.status(201).json({ transaction_id: transactionId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

const getTransactionData = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT 
        t.transaction_id,
        t.user_id,
        t.total_amount,
        t.timestamp,
        c.item_id,
        c.quantity,
        i.name,
        i.description,
        i.price,
        i.image_url,
        i.category_id
      FROM Transaction AS t
      JOIN Cart AS c ON t.transaction_id = c.transaction_id
      JOIN Item AS i ON c.item_id = i.item_id
      WHERE t.transaction_id = $1
    `;
    const result = await db.pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const transactionData = result.rows.map(row => ({
      transaction_id: row.transaction_id,
      user_id: row.user_id,
      total_amount: row.total_amount,
      timestamp: row.timestamp,
      items: {
        item_id: row.item_id,
        quantity: row.quantity,
        name: row.name,
        description: row.description,
        price: row.price,
        image_url: row.image_url,
        category_id: row.category_id,
      },
    }));

    res.status(200).json(transactionData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve transaction data' });
  }
};

const getAllCartItemsById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const query = `
      SELECT c.item_id, c.quantity, i.name, i.description, i.price, i.image_url, i.category_id
      FROM Cart AS c
      JOIN Item AS i ON c.item_id = i.item_id
      WHERE c.transaction_id = $1
    `;
    console.log("hao halo");
    const result = await db.pool.query(query, [id]);
    console.log(result.rows);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cart items not found for the specified transaction ID' });
      return;
    }

    const cartItems = result.rows.map(row => ({
      item_id: row.item_id,
      quantity: row.quantity,
      name: row.name,
      description: row.description,
      price: row.price,
      image_url: row.image_url,
      category_id: row.category_id,
    }));

    console.log("hao halo");

    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
};

module.exports = {
  getAllCartItemsById,
};


module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  getTransactionData,
  getAllCartItemsById
};
