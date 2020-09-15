const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];

//функция формирования верстки каждого товара
const renderProduct = (product) => {
    return `<div class = "product-item">
            <h3>${product.title}</h3>
            <img src = "#" alt = "${product.title}" width="200" height="200">
            <p>${product.price}</p>
            <button class = "buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector(".products").innerHTML = productsList.join(" ");
};

renderPage(products);