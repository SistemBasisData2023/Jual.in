const { pool } = require('../database/db');

class ReviewsController {
  static async createReview(req, res) {
    const { userId, itemId, rating, comment } = req.body;
    console.log(req.body) 
    const query = 'INSERT INTO reviews (user_id, item_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [userId, itemId, rating, comment];
    console.log(values)

    try {
      const result = await pool.query(query, values);
      const newReview = result.rows[0];
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  }

  static async getReviewById(req, res) {
    const reviewId = req.params.id;

    const query = 'SELECT * FROM reviews WHERE review_id = $1';
    const values = [reviewId];

    try {
      const result = await pool.query(query, values);
      const review = result.rows[0];

      if (!review) {
        res.status(404).json({ error: 'Review not found' });
      } else {
        res.json(review);
      }
    } catch (error) {
      console.error('Error retrieving review:', error);
      res.status(500).json({ error: 'Failed to retrieve review' });
    }
  }

  static async updateReviewById(req, res) {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const query = 'UPDATE reviews SET rating = $1, comment = $2 WHERE review_id = $3 RETURNING *';
    const values = [rating, comment, reviewId];

    try {
      const result = await pool.query(query, values);
      const updatedReview = result.rows[0];

      if (!updatedReview) {
        res.status(404).json({ error: 'Review not found' });
      } else {
        res.json(updatedReview);
      }
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ error: 'Failed to update review' });
    }
  }

  static async deleteReviewById(req, res) {
    const reviewId = req.params.id;

    const query = 'DELETE FROM reviews WHERE review_id = $1';
    const values = [reviewId];

    try {
      await pool.query(query, values);
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Failed to delete review' });
    }
  }

  // Get reviews based on rating
  static async getReviewsByRating(req, res) {
    const { rating, itemId } = req.params;

    const query = `
      SELECT r.*, u.username
      FROM reviews r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.item_id = $1 AND r.rating = $2;
    `;
        
    const values = [itemId, rating];

    try {
      const result = await pool.query(query, values);
      const reviews = result.rows;
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }


  static async getAllRatings(req, res) {
    const query = 'SELECT DISTINCT rating FROM reviews';

    try {
      const result = await pool.query(query);
      const ratings = result.rows.map(row => row.rating);
      res.status(200).json(ratings);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      res.status(500).json({ error: 'Failed to fetch ratings' });
    }
  }
  static async getReviewsByItemId(req, res) {
    const itemId = req.params.itemId;
  
    const query = 'SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.user_id WHERE r.item_id = $1 ORDER BY r.rating DESC';
    const values = [itemId];
    console.log(values);
  
    try {
      const result = await pool.query(query, values);
      const reviews = result.rows;
  
      if (reviews.length === 0) {
        res.status(404).json({ error: 'No reviews found for the item' });
      } else {
        res.status(200).json(reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }
  
  
}



module.exports = ReviewsController;
