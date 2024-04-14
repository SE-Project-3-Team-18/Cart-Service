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

async function testUpdateCart() {
    const url = `${baseUrl}/update`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: "user-id-1",
            productId: "product-id-2",
            quantity: 2,
            decrement: false
        })
    });
    const data = await response.json();
    console.log('Update Cart:', data);
}

async function testRemoveCartItem() {
    const url = `${baseUrl}/remove`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: "user-id-1",
                productId: "product-id-1"
            })
        });
        if (response.headers.get("content-type")?.includes("application/json")) {
            const data = await response.json();
            console.log('Remove Cart Item:', data);
        } else {
            const text = await response.text();  
            console.log('Non-JSON Response:', text);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error.message);
    }
}


async function testGetCart() {
    const url = `${baseUrl}/getcart?userId=user-id-1`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    console.log('Get Cart:', data);
}

async function runTests() {
    await testAddToCart();
    await testUpdateCart();
    await testRemoveCartItem();
    await testGetCart();
}

runTests();
