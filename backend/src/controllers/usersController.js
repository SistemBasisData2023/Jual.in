const bcrypt = require('bcrypt');
const db = require('../database/db');
const { pool } = require('../database/db');


const saltRounds = 10;

// Helper function to hash the password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Failed to hash password');
  }
};

// Register a new user or admin
const registerUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const query = 'INSERT INTO Users (username, password_hash, email, role) VALUES ($1, $2, $3, $4) RETURNING user_id';
    const values = [username, hashedPassword, email, role];
    const result = await db.pool.query(query, values);

    const newUser = {
      user_id: result.rows[0].user_id,
      username,
      email,
      role
    };

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login user or admin
const loginUser = async (req, res) => {
  const { username, password, role } = req.body;
  console.log(req.body);
  try {
    const query = 'SELECT * FROM Users WHERE username = $1 AND role = $2';
    const result = await db.pool.query(query, [username, role]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    res.status(200).json({user_id: user.user_id, username: user.username, email: user.email, role: user.role});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  
  const { id } = req.params;
  console.log(req.body);

  try {
    const query = 'SELECT * FROM Users WHERE user_id = $1';
    const result = await db.pool.query(query, [id]);
    //console.log(result.rows);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = result.rows[0];
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    let hashedPassword;

    if (password) {
      // Hash the new password
      hashedPassword = await hashPassword(password);
    }

    const query = 'UPDATE Users SET username = $1, email = $2, password_hash = $3 WHERE user_id = $4';
    const values = [username, email, hashedPassword, id];
    await db.pool.query(query, values);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};


// Delete user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM Users WHERE user_id = $1';
    await db.pool.query(query, [id]);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Top up user's balance
const topUpBalance = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    // Check if the user exists
    const checkUserQuery = 'SELECT * FROM Users WHERE user_id = $1';
    const checkUserResult = await db.pool.query(checkUserQuery, [id]);

    if (checkUserResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Get the user's current balance
    const getUserBalanceQuery = 'SELECT balance FROM Users WHERE user_id = $1';
    const getUserBalanceResult = await db.pool.query(getUserBalanceQuery, [id]);

    const currentBalance = getUserBalanceResult.rows[0].balance;
    const updatedBalance = currentBalance + parseInt(amount);

    // Update the user's balance
    const updateBalanceQuery = 'UPDATE Users SET balance = $1 WHERE user_id = $2';
    await db.pool.query(updateBalanceQuery, [updatedBalance, id]);

    res.status(200).json({ message: 'Balance topped up successfully', balance: updatedBalance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to top up balance' });
  }
};




// Get all users
const getAllUsers = async (req, res) => {
  console.log("Test");
  try {
    const query = 'SELECT * FROM Users';
    const result = await db.pool.query(query);

    const users = result.rows;
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// Perform payment transaction
const performTransaction = async (req, res) => {
  const { id } = req.params;
  const { totalPrice } = req.body;
  console.log(req.params);
  console.log(id);
  console.log('halo bang');
  console.log(req.body);
  console.log(totalPrice);

  try {
    // Get the user's current balance
    const getUserBalanceQuery = 'SELECT balance FROM Users WHERE user_id = $1';
    const getUserBalanceResult = await db.pool.query(getUserBalanceQuery, [id]);

    if (getUserBalanceResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const currentBalance = getUserBalanceResult.rows[0].balance;

    if (totalPrice > currentBalance) {
      res.status(400).json({ error: 'Insufficient balance. Payment cannot be continued.' });
      return;
    }

    const updatedBalance = currentBalance - totalPrice;

    // Update the user's balance
    const updateBalanceQuery = 'UPDATE Users SET balance = $1 WHERE user_id = $2';
    await db.pool.query(updateBalanceQuery, [updatedBalance, id]);

    res.status(200).json({ message: 'Payment processed successfully!', balance: updatedBalance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  deleteUserById,
  topUpBalance,
  performTransaction,
  getAllUsers
};
