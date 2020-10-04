class ProductsList {
    constructor (container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    }

    // 2.Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
    allProductsSum () {
        let totalSum = 0;
        this.goods.forEach (item => totalSum += item.price);
        return totalSum;
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render () {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem (product);
            //this.allProducts.push(productObj);
            //block.innerHTML += productObj.render();
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}


class ProductItem {
    constructor(product, img='https://placehold.it/200x150"') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }

    render () {
        return `<div class = "product-item" data-id = ${this.id}>
                <h3>${this.title}</h3>
                <img src = "${this.img}" alt = "some img">
                <p>${this.price}</p>
                <button class = "buy-btn">Купить</button>
                </div>`
    }
}

let list = new ProductsList();
list.render();



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