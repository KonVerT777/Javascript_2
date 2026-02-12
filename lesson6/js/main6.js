//Отправляйте свои данные с помощью $emit в верхний компонент, а вниз с помощью props
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        searchLine: '',
        isCartOpen: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://placehold.it/70x100',
        products: [],
        imgCatalog: 'https://placehold.it/200x150'
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                       let find = this.cartItems.find(el => el.id_product === item.id_product);
                       if(find){
                           find .quantity++;
                       } else {
                           const prod = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах
                           this.cartItems.push(prod)
                       }
                    }
                })
        },
        delProduct(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filterGoods(){
            let regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    }

});




// class ProductsList {
//     constructor(container = '.products'){
//         this.container = container;
//         this.goods = [];//массив товаров
//         this.allProducts = [];//массив объектов
//         this.filtered = [];
//         this._getProducts()
//             .then(data => { //data - объект js
//                 this.goods = [...data];
//                 this.render()
//             });
//         this._init();
//     }

//     _getProducts(){
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(product => {
//             const block = document.querySelector(`.product-item[data-id="${product.id_product}"]`);
//             if(!this.filtered.includes(product)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }

//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }

//     _init(){
//         document.querySelector('.search').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value)
//         })
//     }

//     render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObj = new ProductItem(product);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }

//     }
// }

// class ProductItem {
//     constructor(product, img = 'https://placehold.it/200x150'){
//         this.title = product.product_name;
//         this.price = product.price;
//         this.id = product.id_product;
//         this.img = img;
//     }
//     render(){
//         return `<div class="product-item" data-id="${this.id}">
//                 <img src="${this.img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${this.title}</h3>
//                     <p>${this.price} $</p>
//                     <button class="buy-btn">Купить</button>
//                 </div>
//             </div>`
//     }
// }

// let list = new ProductsList();

// class Basket {
//     constructor(container = ".basket-block"){
//         this.container = container;
//         this.goods = [];//массив товаров
//         this.allProducts = [];//массив объектов
//         this._getProducts()
//             .then(data => { //data - объект js
//                 this.goods = [...data.contents];
//                 this.render()
//             });
//         this._init();
//     }

//     _getProducts() {
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }

//     _init(){
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//     }

//     render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const basketObj = new BasketItem(product);
//             this.allProducts.push(basketObj);
//             block.insertAdjacentHTML('beforeend', basketObj.render());
//         }

//     }
// }

// class BasketItem {
//     constructor(item, img = 'https://placehold.it/50x100'){
//         this.title = item.product_name;
//         this.price = item.price;
//         this.id = item.id_product;
//         this.img = img;
//         this.quantity = item.quantity;
//     }
//     render(){
//         return `<div class="basket-item" data-id="${this.id}">
//                     <img src="${this.img}" alt="Some image">
//                     <div class="product-desc">
//                         <p class="product-title">${this.title}</p>
//                         <p class="product-quantity">Quantity: ${this.quantity}</p>
//                         <p class="product-single-price">$${this.price} each</p>
//                     </div>
//                     <p class="product-price">$${this.quantity*this.price}</p>
//                     <button class="del-btn" data-id="${this.id}">&times;</button>
//                     </div>
//                 </div>`
//     }

// }

// let basket = new Basket();
// let products = new ProductsList(basket);
        