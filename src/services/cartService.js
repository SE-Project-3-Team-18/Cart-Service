const Cart = require('../models/cartModel');

async function addToCart(userId, productDetails) {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }
    const index = cart.items.findIndex(item => item.productId === productDetails.productId);

    if (index > -1) {
        cart.items[index].quantity += productDetails.quantity;
    } else {
        cart.items.push(productDetails);
    }

    cart.modifiedOn = new Date();
    return cart.save();
}

async function updateCartItem(userId, productId, quantity) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
        throw new Error('Item not found in cart');
    }

    cart.items[itemIndex].quantity = quantity;
    cart.modifiedOn = new Date();
    return await cart.save();
}

async function removeCartItem(userId, productId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new Error('Cart not found');
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.modifiedOn = new Date();
    return await cart.save();
}

async function getCart(userId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
}

module.exports = {
    addToCart, updateCartItem, removeCartItem, getCart
};
