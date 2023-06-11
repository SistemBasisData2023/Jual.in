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



module.exports = {
  createTransaction,
};


module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
};
