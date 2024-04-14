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

async function testUpdateCart() {
    const url = `${baseUrl}/update`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: "user-id-1",
            productId: "product-id-1",
            quantity: 3,
            decrement: false
        })
    });
    const data = await response.json();
    console.log('Update Cart:', data);
}

async function testUpdateCartDecrement(){
    const url = `${baseUrl}/update`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: "user-id-1",
            productId: "product-id-1",
            quantity: 1,
            decrement: true
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


async function testGetCartUser1() {
    const url = `${baseUrl}/getcart?userId=user-id-1`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    console.log('Get Cart User1:', data);
}

async function testGetCartUser2() {
    const url = `${baseUrl}/getcart?userId=user-id-2`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    console.log('Get Cart User2:', data);
}

async function testDeleteCartUser1() {
    const url = `${baseUrl}/delete-cart`;
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
            console.log('Delete Cart User1:', data);
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
    await testUpdateCart();
    await testUpdateCartDecrement();
    await testRemoveCartItemUser1Product1();
    await testRemoveCartItemUser2Product1();
    await testGetCartUser1();
    await testGetCartUser2();
    await testDeleteCartUser1();
    await testGetCartUser1();
}

runTests();
