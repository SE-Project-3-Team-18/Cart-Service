const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.handleAddToCart);
router.put('/decrement-item', cartController.handleDecrementCartItem);
router.delete('/remove-item', cartController.handleRemoveCartItem);
router.delete('/clear-cart', cartController.handleClearCart);
router.get('/view-cart', cartController.handleViewCart);

module.exports = router;
