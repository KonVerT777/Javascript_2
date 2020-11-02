const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        getBasket: '/getBasket.json',
        products: [],
        cart: [],
        isCartOpen: false,
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        filtered: [],
        
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            this.cart.push(product);
        },
        delProduct(productDel){
            this.cart.splice(this.productDel,1);       
        },
        // FilterGoods() {
        //     return this.products.filter(product => product.product_name.indexOf(this.searchLine) !== -1)
        //   },
        // FilterGoods() {
        //     //console.log(this.search.text);
        //     var inside = this;
        //     this.product = this.products.filter(function(product) {
        //       if (
        //         product.product_name
        //           .toLowerCase()
        //           .indexOf(inside.searchLine.text.toLowerCase()) != "-1"
        //       ) {
        //         return product;
        //       }
        //     });
        //   },

        FilterGoods(searchLine) {
            const regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(product => {
                const block = document.querySelector(".product-item.key");
                if(!this.filtered.includes(product)){
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                 }
              })
        }
        
        // FilterGoods () {
        //     let text = this.searchLine.toLowerCase().trim();
            
        //     if (text === '') {
        //         this.filtered = this.products;
        //     } else {
        //         this.filtered = this.products.filter((el) => {
        //             return el.product_name.toLowerCase().includes(text);
        //         });
        //     }
        // }
    },
    mounted(){
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
               }
           });
        this.getJson(`${API + this.getBasket}`)
           .then(data => {
               for (let el of data.contents) {
                   this.cart.push(el);
               }
             });
     }
})


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
        