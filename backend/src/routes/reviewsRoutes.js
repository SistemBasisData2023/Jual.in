const express = require('express');
const router = express.Router();
const ReviewsController = require('../controllers/reviewsController');

router.post('/create', ReviewsController.createReview);
router.get('/:id/singlereview', ReviewsController.getReviewById);
router.put('/:id/update', ReviewsController.updateReviewById);
router.delete('/:id/delete', ReviewsController.deleteReviewById);

// Route for getting reviews based on rating
router.get('/:itemId/:rating', ReviewsController.getReviewsByRating);

// Get all ratings
router.get('/allrating', ReviewsController.getAllRatings);

router.get('/:itemId', ReviewsController.getReviewsByItemId);


module.exports = router;
