const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Routes
router.get('/', itemController.getAllItems);
router.get('/search', itemController.searchItems);
router.get('/new', itemController.showNewItemForm);
router.post('/new', itemController.createNewItem);
router.get('/:id', itemController.getItemById);
router.get('/:id/edit', itemController.showEditForm);
router.post('/:id/edit', itemController.updateItem);
router.post('/:id/delete', itemController.deleteItem);
module.exports = router;