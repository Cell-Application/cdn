let cost = 0;
function getDataFromStorage() {
    const cart = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')): [];
    let count = 0;
    cost = 0
    for (const item of cart) {
        count = count + item.quan;
        cost += parseInt(item.price)
    }
    document.getElementById('num_cart').innerText = count;
    document.getElementById('sumValue').innerText = cost;
    document.getElementById('button-submit').addEventListener('click', () => submitForm())
}

getDataFromStorage();

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function changeQuan(id_product, event) {
    console.log('onchange worked');
    const cart = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')): [];
    const existItem = cart.find(product => product.id === id_product);
    if (existItem) {
        existItem.price = parseInt(existItem.price);
        existItem.price = parseInt(event.value)*existItem.basedPrice;
        window.localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById(id_product + 'id').innerText = existItem.price;
        getDataFromStorage();
    }
}

const submitForm = async () => {
    const getDate = new Date();
    const id = uuidv4();
    const submitValue = {
        ORDER_DATE: getDate,
        ID: id,
        SUBTOTAL: cost
    }
    await fetch('https://api.vuonan.erp365.vn/api/Dynamic/create/e0d24107-c251-42f1-a3b8-4173a704766f', {
        method: 'POST',
        body: JSON.stringify(submitValue),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const cart = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')): [];
    for (const item of cart) {
        const submitValue = {
            SUBTOTAL: item.price,
            QUANTITY: item.quan,
            PRODUCT: item.id,
            ORDER: id
        }
        await fetch('https://api.vuonan.erp365.vn/api/Dynamic/create/7a9331b7-eb21-4971-a8c2-29053f7b05e5', {
            method: 'POST',
            body: JSON.stringify(submitValue),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

function getItemFromCart () {
    let table = document.querySelector('#table-product tbody');

    const cart = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')): [];
    for (const item of cart) {
        const index = cart.indexOf(item);
        table.innerHTML += '<tr class=\'product-list\'>\n' +
            '                    <td>\n' +
            '                        <div class=\'d-flex\'>\n' +
            '                            <img src=\'https://vuonan.vn/upload/products/thumb_280x0/bach-hoa-tra-balace-inner-set-hop-qua-1621416543.jpg\'\n' +
            '                                 class=\'mr-4 img-prod-pay\'\n' +
            '                                 alt=\'\'/>\n' +
            '                            <div class=\'name-product-cart\'>\n' +
            '                                <p>'+ item.name +'</p>\n' +
            '                                <button class=\'btn text-danger\'>Xóa</button>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </td>\n' +
            '                    <td>\n' +
            '                        <div class=\'cost-pay\'>\n' +
            '                            <h5>'+ item.price + 'đ</h5>\n' +
            '                            <p class=\'\'>0 đ</p>\n' +
            '                        </div>\n' +
            '                    </td>\n' +
            '                    <td>\n' +
            '                        <div class=\'weight\'></div>\n' +
            '                    </td>\n' +
            '                    <td>\n' +
            '                        <div class=\'number-prod-pay\'>\n' +
            '                            <input type=\'number\' id=\'' + item.id +  '\' class=\'form-control\' value=\''+ item.quan +'\'>\n' +
            '                        </div>\n' +
            '                    </td>\n' +
            '                    <td>\n' +
            '                        <div id=\'' + item.id + 'id' +  '\' class=\'cost-done\'>'+ item.price +'đ</div>\n' +
            '                    </td>\n' +
            '                </tr>'
        const element = document.getElementById(item.id);
        element.addEventListener('change', () => changeQuan(item.id , element));
    }
}
getItemFromCart();
