const cartService = require('../services/cartService');
const productService = require('../services/productService');

async function handleAddToCart(req, res) {
    try {
        const { userId, productId } = req.body;
        const productDetails = await productService.fetchProductDetails(productId);

        if (!productDetails) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedCart = await cartService.addToCart(userId, productDetails);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
}

async function handleUpdateCart(req, res) {
    const { userId, productId, quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).send('Quantity must be at least 1.');
    }

    try {
        const cart = await cartService.updateCartItem(userId, productId, quantity);
        res.send(cart);
    } catch (error) {
        if (error.message === 'Cart not found' || error.message === 'Item not found in cart') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
}

async function handleRemoveCartItem(req, res) {
    const { userId, productId } = req.body;

    try {
        const cart = await cartService.removeCartItem(userId, productId);
        res.send(cart);
    } catch (error) {
        if (error.message === 'Cart not found') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
}

async function handleGetCart(req, res) {
    const { userId } = req.query;

    try {
        const cart = await cartService.getCart(userId);
        res.send(cart);
    } catch (error) {
        if (error.message === 'Cart not found') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
}


module.exports = {
    handleAddToCart, handleUpdateCart, handleRemoveCartItem, handleGetCart
};
