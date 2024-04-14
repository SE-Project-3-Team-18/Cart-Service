const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    imageUrl: { type: String, required: false }
});

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [cartItemSchema],
    total: { type: Number, required: true, default: 0 },
    modifiedOn: { type: Date, default: Date.now }
});

cartSchema.pre('save', function(next) {
    this.total = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
