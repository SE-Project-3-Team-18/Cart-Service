const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.handleAddToCart);
router.put('/update', cartController.handleUpdateCart);
router.delete('/remove-item', cartController.handleRemoveCartItem);
router.delete('/delete-cart', cartController.handleDeleteCart);
router.get('/getcart', cartController.handleGetCart);

module.exports = router;
