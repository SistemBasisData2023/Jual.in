const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// GET all items
router.get('/all', itemController.getAllItems);

// GET item by ID
router.get('/:id', itemController.getItemById);

// POST create a new item
router.post('/create', itemController.createItem);

// PUT update item by ID
router.put('/:id/update', itemController.updateItemById);

// DELETE item by ID
router.delete('/:id/delete', itemController.deleteItemById);

module.exports = router;
