const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add/:productId', cartController.handleAddToCart);
router.put('/decrement-item/:productId', cartController.handleDecrementCartItem);
router.delete('/remove-item/:productId', cartController.handleRemoveCartItem);
router.delete('/clear-cart', cartController.handleClearCart);
router.get('/view-cart', cartController.handleViewCart);
router.get('/view/:userId',cartController.getCartbyUserId);

module.exports = router;
