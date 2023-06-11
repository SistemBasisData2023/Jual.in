const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Get all transactions
router.get('/', transactionController.getAllTransactions);

// Get transaction by ID
router.get('/:id', transactionController.getTransactionById);

// Create a new transaction
router.post('/create', transactionController.createTransaction);

router.get('/data/:id', transactionController.getTransactionData);

router.get('/:id/cardId', transactionController.getAllCartItemsById);

module.exports = router;
