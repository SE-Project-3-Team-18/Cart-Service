const baseUrl = 'http://localhost:5080/api';

async function testAddToCartUser1Product1() {
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
    console.log('Add to Cart User1 Product1:', data);
}

async function testAddToCartUser1Product2() {
    const url = `${baseUrl}/add`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: "user-id-1",
            productId: "product-id-2"
        })
    });
    const data = await response.json();
    console.log('Add to Cart User1 Product2:', data);
}

async function testAddToCartUser2Product1() {
    const url = `${baseUrl}/add`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: "user-id-2",
            productId: "product-id-1"
        })
    });
    const data = await response.json();
    console.log('Add to Cart User2 Product1:', data);
}

async function testAddToCartUser2Product2() {
    const url = `${baseUrl}/add`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: "user-id-2",
            productId: "product-id-2"
        })
    });
    const data = await response.json();
    console.log('Add to Cart User2 Product2:', data);
}

async function testDecrementCartItemUser1Product1() {
    const url = `${baseUrl}/decrement-item`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: "user-id-1",
            productId: "product-id-1"
        })
    });
    const data = await response.json();
    console.log('Decrement Cart Item User1 Product1:', data);
}

async function testDecrementCartItemUser2Product1(){
    const url = `${baseUrl}/decrement-item`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: "user-id-2",
            productId: "product-id-1"
        })
    });
    const data = await response.json();
    console.log('Update Cart Decrement:', data);
}

async function testRemoveCartItemUser1Product1() {
    const url = `${baseUrl}/remove-item`;
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
            console.log('Remove Cart Item User1 Product1:', data);
        } else {
            const text = await response.text();  
            console.log('Non-JSON Response:', text);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error.message);
    }
}

async function testRemoveCartItemUser2Product1() {
    const url = `${baseUrl}/remove-item`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: "user-id-2",
                productId: "product-id-1"
            })
        });
        if (response.headers.get("content-type")?.includes("application/json")) {
            const data = await response.json();
            console.log('Remove Cart Item User2 Product1:', data);
        } else {
            const text = await response.text();  
            console.log('Non-JSON Response:', text);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error.message);
    }
}


async function testViewCartUser1() {
    const url = `${baseUrl}/view-cart?userId=user-id-1`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    console.log('View Cart User1:', data);
}

async function testViewCartUser2() {
    const url = `${baseUrl}/view-cart?userId=user-id-2`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    console.log('View Cart User2:', data);
}

async function testClearCartUser1() {
    const url = `${baseUrl}/clear-cart`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: "user-id-1"
            })
        });
        if (response.headers.get("content-type")?.includes("application/json")) {
            const data = await response.json();
            console.log('Clear Cart User1:', data);
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
    await testAddToCartUser2Product1();
    await testAddToCartUser2Product2();
    await testDecrementCartItemUser1Product1();
    await testDecrementCartItemUser2Product1();
    await testRemoveCartItemUser1Product1();
    await testRemoveCartItemUser2Product1();
    await testViewCartUser1();
    await testViewCartUser2();
    await testClearCartUser1();
    await testViewCartUser1();
}

runTests();
