const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require('../database/multer');


// GET all items
router.get('/all', itemController.getAllItems);

// GET item by ID
router.get('/:id', itemController.getItemById);

// POST create a new item
// router.post('/create', upload.single("image"),  itemController.createItem);

// PUT update item by ID
router.put('/:id/update', itemController.updateItemById);

// DELETE item by ID
router.delete('/:id/delete', itemController.deleteItemById);

// Upload File
router.post('/create', upload.single("image"), itemController.createItem);


module.exports = router;
