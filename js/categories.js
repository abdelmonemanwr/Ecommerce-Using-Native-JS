let categoryFilter = document.getElementById('category-filter');
let cartIconCounter = document.querySelector(".cart-icon-counter");
let productsContainer = document.getElementById('products-container');

// Retrieve products from the API: fake store api
const getProducts = async () => {
	try {
		try {
			const response = await fetch('https://fakestoreapi.com/products');
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
			const response = await fetch('http://localhost:3000/products');
			const data = await response.json();
			return data;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Global variable to store products data from the API
let products;

// Fetch products and display them
async function getProductsAndDisplay() {
    products = await getProducts();
    displayProducts(products);
    // console.log(products);
    cartIconCounter.textContent = getCartFromLocalStorage().length;
}

// initially get alll products
getProductsAndDisplay();

// filtering based on category
function filterProducts(category) {
    if(category == 'All') {
        getProductsAndDisplay();
    } else {
        displayProducts(products.filter((product) => product.category === category));
    }
}

// Get DOM elements

// Display products in the products container DOM
async function displayProducts(productsData) {
    let cart = getCartFromLocalStorage();
    productsContainer.innerHTML = '';
    productsData.forEach((product) => {
        pushProductToDOM(product, cart);
    });
}

myCategories = []
function pushProductToDOM(product, cart) {
    let bigDiv = document.createElement('div');
    bigDiv.classList.add('bigDiv');

    if (myCategories.includes(product.category) === false) {
        let categoryType = document.createElement('button');
        categoryType.textContent = product.category;
        categoryType.classList.add('categoryType');
        categoryFilter.appendChild(categoryType);
        myCategories.push(product.category)
    }

    let productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.style.display = 'flex';
    productDiv.style.flexDirection = 'column';
    // productDiv.style.border = '1px solid red';
    productDiv.style.borderRadius = '5px';
    productDiv.style.padding = '10px';
    productDiv.style.alignItems = 'center';
    productDiv.style.justifyContent = 'center';
    productDiv.style.height = '200px';



    // imageDiv in the productDiv
    let productImageDiv = document.createElement('div');
    productImageDiv.classList.add('productImageDiv');
    productImageDiv.style.backgroundImage = `url(${product.image})`;
    productImageDiv.style.backgroundSize = 'auto 100%';
    productImageDiv.style.backgroundPosition = 'center';
    productDiv.appendChild(productImageDiv);

    // let productTitleDiv = document.createElement('div');
    // productTitleDiv.classList.add('productTitleDiv');
    // productTitleDiv.textContent = `Title: ${product.title}`;
    // productDiv.appendChild(productTitleDiv);

    let productPriceDiv = document.createElement('div');
    productPriceDiv.classList.add('productPriceDiv');
    productPriceDiv.textContent = `Price: ${product.price} $`;
    productDiv.appendChild(productPriceDiv);

    bigDiv.appendChild(productDiv);

    let infoAndButtonContainer = document.createElement('div');
    infoAndButtonContainer.style.display = 'flex';
    infoAndButtonContainer.style.flexDirection = 'column';
    infoAndButtonContainer.style.justifyContent = 'space-around';
    infoAndButtonContainer.style.border = '1px solid #ddd';
    infoAndButtonContainer.style.borderRadius = '25px';
    infoAndButtonContainer.style.padding = '1px';
    infoAndButtonContainer.style.alignItems = 'center';
    infoAndButtonContainer.style.minHeight = '250px';
    infoAndButtonContainer.appendChild(bigDiv);

    let addToCartButton = document.createElement('button');
    addToCartButton.classList.add('addToCartButtonn');
    addToCartButton.style.width = '90%';
    // addToCartButton.style.height = '40px';
    addToCartButton.style.borderRadius = '25px';
    addToCartButton.style.border = '1px solid #ddd';
    addToCartButton.style.padding = '10px';
    addToCartButton.style.margin = '10px';

    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.addEventListener('click', () => {
        product.quantity = 1;
        addToCart(product, addToCartButton);
    });
    // if the product exists in local storage apply the style to the button
    if (cart.some((productNLocalStorage) => productNLocalStorage.id === product.id)) {
        add2CartProperties(addToCartButton);
    }
    infoAndButtonContainer.appendChild(addToCartButton);
    productsContainer.appendChild(infoAndButtonContainer);

    bigDiv.addEventListener('click', () => {
        //cartIconCounter.textContent = getCartFromLocalStorage().length;
        localStorage.setItem('clickedProduct', JSON.stringify(product));
        console.log(localStorage.getItem('clickedProduct'));
        console.log(product);
        let newWindow = window.open('viewProduct.html', '_blank');
    });


}

// Add a product to the cart
function addToCart(product, addToCartButton) {
    let cart = getCartFromLocalStorage();
    product.quantity = 1;
    cart.push(product);
    setCartToLocalStorage(cart);
    console.log('Product added to cart!');
    cartIconCounter.textContent = getCartFromLocalStorage().length;
    swal({
        title: "Product added to cart",
        icon: "success",
        button: "ok",
    });
    add2CartProperties(addToCartButton);
}

function add2CartProperties(addToCartButton) {
    if (addToCartButton) {
        addToCartButton.textContent = 'Added to Cart';
        addToCartButton.disabled = true;
        addToCartButton.style.cursor = 'not-allowed';
        addToCartButton.style.color = 'white';
        addToCartButton.style.backgroundColor = 'green'
        addToCartButton.style.borderColor = 'gray';
        addToCartButton.style.boxShadow = 'none';
        addToCartButton.style.textShadow = 'none';
    }
}

// Get the cart data from local storage
function getCartFromLocalStorage() {
    return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
}

// Set the cart data to local storage
function setCartToLocalStorage(cart) {

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Filter products based on category
categoryFilter.addEventListener('click', (event) => {
    let category = event.target.textContent;
    filterProducts(category);

    let otherButtons = categoryFilter.querySelectorAll('.categoryType');
    otherButtons.forEach((button) => {
        if (button !== event.target) {
            button.style.backgroundColor = 'lightblue';
            button.style.color = 'black';
            button.style.borderColor = 'gray';
        } else {
            button.style.backgroundColor = 'green';
            button.style.color = 'white';
            button.style.borderColor = 'green';
        }
    })
});

let myCart = document.querySelector('.cart-icon');

myCart.addEventListener('click', () => {
    cartIconCounter.textContent = getCartFromLocalStorage().length;
    let newWindow = window.open('cart.html', '_blank');
});
