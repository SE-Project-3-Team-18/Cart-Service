const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.handleAddToCart);
router.put('/update', cartController.handleUpdateCart);
router.delete('/remove', cartController.handleRemoveCartItem);
router.get('/', cartController.handleGetCart);

module.exports = router;
