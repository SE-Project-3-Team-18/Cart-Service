const baseUrl = 'http://localhost:5080/api';

async function testAddToCart() {
    const url = `${baseUrl}/add`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: "user-id-1",
            productId: "product-id-1"
        })
    });
    const data = await response.json();
    console.log('Add to Cart:', data);
}

async function testGetCart() {
    const url = `${baseUrl}/getcart?userId=user-id-1`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    console.log('Get Cart:', data);
}

async function runTests() {
    await testAddToCart();
    await testGetCart();
}

runTests();