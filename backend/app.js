
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./src/database/db'); // Updated file path for db.js

const usersRoutes = require('./src/routes/usersRoutes');
const itemsRoutes = require('./src/routes/itemRoutes');
const transactionsRoutes = require('./src/routes/transactionRoutes');
const reviewsRoutes = require('./src/routes/reviewsRoutes');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//===========================
//=======================================================


//Routes
app.use('/users', usersRoutes);
app.use('/items', itemsRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/reviews', reviewsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
