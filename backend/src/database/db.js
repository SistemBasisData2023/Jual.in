const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

/**
 * The database connection pool.
 * @type {Pool}
 */
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require',
  },
});

/**
 * Tests the database connection.
 * Logs a success message if the connection is successful, otherwise logs an error message.
 * @returns {Promise<void>}
 */
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection();

module.exports = { pool };
