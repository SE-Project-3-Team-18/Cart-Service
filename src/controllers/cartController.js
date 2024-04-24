const cartService = require("../services/cartService");
const productService = require("../services/productService");
const { CustomError } = require("../utils/error");

async function handleAddToCart(req, res, next) {
  try {
    const userId = req.get("X-User-Id");
    const { productId } = req.params;
    const productDetails = await productService.fetchProductDetails(productId);
    console.log(productDetails);
    const newproduct = {
      productId: productDetails._id,
      name: productDetails.name,
      price: productDetails.price,
      quantity: 1,
      total_quantity: productDetails.quantity
    };
    // for testing purpose, we can use this by getting dummy products.
    // const productDetails = await productService.getProductDetails(productId);

    if (!productDetails) {
      throw new CustomError("Product not found", 404, false);
    }
    console.log("newproduct",newproduct);
    const updatedCart = await cartService.addToCart(userId,newproduct);
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
}

async function handleDecrementCartItem(req, res, next) {
  const userId = req.get("X-User-Id");
  const { productId } = req.params;

  try {
    const cart = await cartService.decrementCartItem(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
}

async function handleRemoveCartItem(req, res, next) {
  const userId = req.get("X-User-Id");
  const { productId } = req.params;

  try {
    const cart = await cartService.removeCartItem(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
}

async function handleViewCart(req, res, next) {
  const userId = req.get("X-User-Id");
  try {
    const cart = await cartService.viewCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
}

async function handleClearCart(req, res, next) {
  const userId = req.get("X-User-Id");

  try {
    const result = await cartService.clearCart(userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getCartbyUserId(req,res,next){
    const userId = req.params.userId;
    try {
        const cart = await cartService.viewCart(userId);
        res.status(200).json(cart);
      } catch (error) {
        next(error);
      }

}

module.exports = {
  handleAddToCart,
  handleDecrementCartItem,
  handleRemoveCartItem,
  handleViewCart,
  handleClearCart,
  getCartbyUserId
};
