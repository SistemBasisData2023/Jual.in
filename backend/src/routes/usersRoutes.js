const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Register a new user or admin
router.post('/register', usersController.registerUser);

// Login user or admin
router.post('/login', usersController.loginUser);

// Get user by ID
router.get('/singleId/:id', usersController.getUserById);

// Update user by ID
router.put('/:id', usersController.updateUserById);

// Delete user by ID
router.delete('/:id', usersController.deleteUserById);

// Top up user's balance
router.patch('/topup/:id', usersController.topUpBalance);

// // Perform a transaction between user and admin
// router.post('/transactions', usersController.performTransaction);

// Get All User
router.get('/allusers', usersController.getAllUsers);

// Perform a transaction between user and admin
router.post('/transactions/:id', usersController.performTransaction);

module.exports = router;

