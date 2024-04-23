const baseUrl = 'http://localhost:5080/api';

async function testAddToCartUser1Product1() {
    const productId = "product-id-1";
    const url = `${baseUrl}/add/${productId}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    console.log('Add to Cart User1 Product1:', data);
}

async function testAddToCartUser1Product2() {
    const productId = "product-id-2";
    const url = `${baseUrl}/add/${productId}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    console.log('Add to Cart User1 Product2:', data);
}

async function testDecrementCartItemUser1Product1() {
    const productId = "product-id-1";
    const url = `${baseUrl}/decrement-item/${productId}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    console.log('Decrement Cart Item User1 Product1:', data);
}

async function testRemoveCartItemUser1Product1() {
    const productId = "product-id-1";
    const url = `${baseUrl}/remove-item/${productId}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        if (response.headers.get("content-type")?.includes("application/json")) {
            const data = await response.json();
            console.log('Remove Cart Item User1 Product1:', data);
        } else {
            const text = await response.text();  
            console.log('Non-JSON Response:', text);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error.message);
    }
}


async function testViewCartUser1() {
    const url = `${baseUrl}/view-cart`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    console.log('View Cart:', data);
}

async function testClearCartUser1() {
    const url = `${baseUrl}/clear-cart`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        if (response.headers.get("content-type")?.includes("application/json")) {
            const data = await response.json();
            console.log('Clear Cart:', data);
        } else {
            const text = await response.text();  
            console.log('Non-JSON Response:', text);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error.message);
    }
}


async function runTests() {
    await testAddToCartUser1Product1();
    await testAddToCartUser1Product2();
    await testAddToCartUser1Product1();
    await testAddToCartUser1Product1();
    await testDecrementCartItemUser1Product1();
    await testRemoveCartItemUser1Product1();
    await testViewCartUser1();
    await testClearCartUser1();
    await testViewCartUser1();
}

runTests();
