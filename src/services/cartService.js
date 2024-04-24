const Cart = require("../models/cartModel");
const { CustomError } = require("../utils/error");

// Adds an item to the cart or updates the quantity if the item already exists
async function addToCart(userId, productDetails) {
  let cart = await Cart.findOne({ userId });
  const details = {
    productId: productDetails.productId,
    name: productDetails.name,
    price: productDetails.price,
    quantity: 1,
  };
  const total_quantity = productDetails.total_quantity
  productDetails = details;
  if (!cart) {
    // Create a new cart if none exists
    cart = new Cart({
      userId,
      items: [productDetails],
      total: productDetails.price * productDetails.quantity,
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productDetails.productId
    );
    if (itemIndex > -1) {
      // Update quantity and price if item exists
      cart.items[itemIndex].quantity += 1;
      cart.items[itemIndex].price = productDetails.price;
      if(cart.items[itemIndex].quantity>total_quantity){
        throw new CustomError("Out of stock", 404);
      }
    } else {
      // Add new item to cart
      cart.items.push(productDetails);
    }
    // Calculate total price
    calculateCartTotal(cart);
  }
  cart.modifiedOn = new Date();
  return await cart.save();
}

async function decrementCartItem(userId, productId) {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId === productId
  );
  if (itemIndex === -1) {
    throw new CustomError("Item not found in cart", 404);
  }

  cart.items[itemIndex].quantity -= 1;
  if (cart.items[itemIndex].quantity < 1) {
    cart.items.splice(itemIndex, 1);
  }

  calculateCartTotal(cart);
  cart.modifiedOn = new Date();
  return await cart.save();
}
// Removes an item from the cart
async function removeCartItem(userId, productId) {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found", 404, false);
  }

  cart.items = cart.items.filter((item) => item.productId !== productId);
  calculateCartTotal(cart);
  cart.modifiedOn = new Date();
  return await cart.save();
}

// Retrieves the cart for a specific user
async function viewCart(userId) {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found", 404, false);
  }
  return cart;
}

// Deletes the entire cart for a specific user
async function clearCart(userId) {
  const result = await Cart.deleteOne({ userId });
  if (result.deletedCount === 0) {
    throw new CustomError("Cart not found", 404);
  }
  return { message: "Cart deleted successfully" };
}

// Helper function to calculate the total price of the cart
function calculateCartTotal(cart) {
  cart.total = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
}

module.exports = {
  addToCart,
  decrementCartItem,
  removeCartItem,
  viewCart,
  clearCart,
};
