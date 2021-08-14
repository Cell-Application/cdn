function addEvent() {
    for (let i = 0; i < 100; i++) {
        const item = (document.getElementsByClassName('button-card').item(i));
        console.log(document.getElementsByClassName('button-card').item(i), i);
        if (!item) {
        } else {
            const id = item.getElementsByTagName('span').item(0).innerText;
            const name = item.getElementsByTagName('h6').item(0).innerText;
            const price = parseInt(item.getElementsByTagName('div').item(0).innerText);
            document.getElementsByClassName('button-card').item(i).addEventListener('click', () => addProduct(id, name, null ,price));
        }
    }
}

addEvent();

function getDataFromStorage() {
    const cart = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')): [];
    let count = 0;
    for (const item of cart) {
        count = count + item.quan;
    }
    document.getElementById('num_cart').innerText = count;
}

function addProduct(id, name, img, price) {
    alert('Đã thêm sản phảm vào giỏ hàng')
    const cart = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')): [];
    const existItem = cart.find(product => product.id === id);
    if (existItem) {
        existItem.quan += 1;
    } else {
        cart.push({
            id,
            name,
            img,
            price,
            quan: 1
        })
    }
    let count = 0;
    for (const item of cart) {
        count = count + item.quan;
    }
    window.localStorage.setItem('cart', JSON.stringify(cart));
    console.log(count, 'count');
    document.getElementById('num_cart').innerText = count;
}
