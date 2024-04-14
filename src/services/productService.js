
const ServiceRegistryClient = require('../utils/serviceRegistry');
const { CustomError } = require('../utils/error');

async function fetchProductDetails(productId) {
  try {
    const ProductServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Product')
    const response = await fetch(`${ProductServiceUrl}/api/get-product`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new CustomError('HTTP error! in fetching product details', 500, false);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    throw error;
  }
}

module.exports = { fetchProductDetails };
