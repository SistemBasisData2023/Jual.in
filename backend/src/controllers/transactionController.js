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
  const { user_id, item_id, price, quantity, total_amount } = req.body;

  try {
    const query = 'INSERT INTO Transaction (user_id, item_id, price, quantity, total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [user_id, item_id, price, quantity, total_amount];
    const result = await db.pool.query(query, values);

    const newTransaction = result.rows[0];
    res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
};
