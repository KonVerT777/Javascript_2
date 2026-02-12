const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();

class Basket {
    constructor(container = ".basket-block"){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render()
            });
        this._init();
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    _init(){
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }

    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const basketObj = new BasketItem(product);
            this.allProducts.push(basketObj);
            block.insertAdjacentHTML('beforeend', basketObj.render());
        }

    }
}

class BasketItem {
    constructor(item, img = 'https://placehold.it/50x100'){
        this.title = item.product_name;
        this.price = item.price;
        this.id = item.id_product;
        this.img = img;
        this.quantity = item.quantity;
    }
    render(){
        return `<div class="basket-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">${this.title}</p>
                        <p class="product-quantity">Quantity: ${this.quantity}</p>
                        <p class="product-single-price">$${this.price} each</p>
                    </div>
                    <p class="product-price">$${this.quantity*this.price}</p>
                    <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }

}

let basket = new Basket();
let products = new ProductsList(basket);

//let basket = new Basket();




// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
// ];

// //функция формирования верстки каждого товара
// const renderProduct = (product) => {
//     return `<div class = "product-item">
//             <h3>${product.title}</h3>
//             <img src = "#" alt = "${product.title}" width="200" height="200">
//             <p>${product.price}</p>
//             <button class = "buy-btn">Купить</button>
//             </div>`
// };

// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item));
//     console.log(productsList);
//     document.querySelector(".products").innerHTML = productsList.join(" ");
// };

// renderPage(products);