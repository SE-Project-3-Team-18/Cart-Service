
const ServiceRegistryClient = require('../utils/serviceRegistry');
const { CustomError } = require('../utils/error');
const axios = require('axios');
async function fetchProductDetails(productId) {
  try {
    const ProductServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Product')
    const response = await fetch(`${ProductServiceUrl}/api/product/${productId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new CustomError('HTTP error! in fetching product details', 500, false);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    throw error;
  }
}

// adding this function for testing purpose

async function getProductDetails(productId) {
  const products = {
    'product-id-1': {
      productId: 'product-id-1',
      name: 'Product One',
      price: 10.00,
      quantity: 1
    },
    'product-id-2': {
      productId: 'product-id-2',
      name: 'Product Two',
      price: 20.00,
      quantity: 1
    }
  };

  // Check if the product exists in the dummy data
  if (products[productId]) {
    return products[productId];
  } else {
    // Throw an error if no product matches the provided ID
    throw new CustomError(`Product not found for ID: ${productId}`, 404, false);
  }
}

async function decreaseProductQuantity(items){
  try {
    const ProductServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Product');
    const newObject = {
      cart : items
    }
    const response = await axios.put(`${ProductServiceUrl}/api/product/buy`, newObject);
    return response.data; 
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    throw error;
  }
}



module.exports = { fetchProductDetails, getProductDetails, decreaseProductQuantity};
