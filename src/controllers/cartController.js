const cartService = require('../services/cartService');
const productService = require('../services/productService');
const { CustomError } = require('../utils/error');

async function handleAddToCart(req, res, next) {
    try {
        const { userId, productId } = req.body;
        // const productDetails = await productService.fetchProductDetails(productId);
        
        // for testing purpose, we can use this by getting dummy products.
        const productDetails = await productService.getProductDetails(productId);

        if (!productDetails) {
            throw new CustomError('Product not found', 404, false)
        }

        const updatedCart = await cartService.addToCart(userId, productDetails);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

async function handleDecrementCartItem(req, res, next) {
    const { userId, productId} = req.body;


    try {
        const cart = await cartService.decrementCartItem(userId, productId);
        res.send(cart);
    } catch (error) {
       next(error);
    }
}

async function handleRemoveCartItem(req, res, next) {
    const { userId, productId } = req.body;

    try {
        const cart = await cartService.removeCartItem(userId, productId);
        res.send(cart);
    } catch (error) {
        next(error);
    }
}

async function handleViewCart(req, res, next) {
    const { userId } = req.query;

    try {
        const cart = await cartService.viewCart(userId);
        res.send(cart);
    } catch (error) {
        next(error);
    }
}

async function handleClearCart(req, res, next) {
    const { userId } = req.body;

    try {
        const result = await cartService.clearCart(userId);
        res.send(result);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    handleAddToCart, handleDecrementCartItem, handleRemoveCartItem, handleViewCart, handleClearCart
};
