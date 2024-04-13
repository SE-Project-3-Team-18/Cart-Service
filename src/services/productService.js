
async function fetchProductDetails(productId) {
  try {
    const url = `http://product-service/api/products/${productId}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    throw error;
  }
}

module.exports = { fetchProductDetails };
