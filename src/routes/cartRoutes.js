const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.handleAddToCart);
router.put('/update', cartController.handleUpdateCart);
router.delete('/api/remove', cartController.handleRemoveCartItem);
router.get('/getcart', cartController.handleGetCart);

module.exports = router;
