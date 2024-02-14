document.addEventListener('DOMContentLoaded', function () {
    const product = JSON.parse(localStorage.getItem('clickedProduct'));
    let exists = productExistsInCart(product);
    updateProductDetails(product, exists);
});

function productExistsInCart(product) {
    const cart = getCartFromLocalStorage();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id.toString() === product.id.toString()) {
            return true;
        }
    }
    return false;
}

function getCartFromLocalStorage() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

const cartIconCounter = document.querySelector(".cart-icon-counter");
cartIconCounter.innerHTML = getCartFromLocalStorage().length;

function createStars(rating) {
    const starsContainer = document.getElementById('productRating');
    const roundedRating = Math.round(rating.rate * 2) / 2;

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star');
        if (i < roundedRating) {
            star.style.color = 'gold';
        } else {
            star.style.color = 'lightgray';
        }
        starsContainer.appendChild(star);
    }
}

function addToCart(product, button) {
    const cart = getCartFromLocalStorage();
    product.quantity = 1;
    cart.push(product);
    console.log(`pro = ${product.quantity}`);
    setCartToLocalStorage(cart);
    console.log('Product added to cart!');
    cartIconCounter.textContent = cart.length;
    button.textContent = 'Remove From Cart';
    button.removeEventListener('click', handleAddToCart);
    button.addEventListener('click', handleRemoveFromCart);
    
    swal({
        title: "Product added to cart",
        icon: "success",
        button: "ok",
    });
}

function removeFromCart(product) {
    const cart = getCartFromLocalStorage();
    const index = cart.findIndex(p => p.id === product.id);
    if (index !== -1) {
        cart.splice(index, 1);
        setCartToLocalStorage(cart);
        console.log('Product removed from cart!');
        cartIconCounter.textContent = cart.length;
        swal({
            title: "Product removed from cart",
            icon: "success",
            button: "ok",
        }).then({
            
        });
    }
}

function handleAddToCart() {
    const product = JSON.parse(localStorage.getItem('clickedProduct'));
    addToCart(product, this);
}

function handleRemoveFromCart() {
    const product = JSON.parse(localStorage.getItem('clickedProduct'));
    removeFromCart(product);
    this.textContent = 'Add To Cart';
    this.removeEventListener('click', handleRemoveFromCart);
    this.addEventListener('click', handleAddToCart);
}

function setCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    cartIconCounter.textContent = cart.length;
}

function updateProductDetails(product, existsInCart) {
    if (!product) {
        console.error('Product details not found.');
        return;
    }

    const { image, title, category, description, price, rating } = product;

    const imageElement = document.getElementById('productImage');
    const nameElement = document.getElementById('productName');
    const categoryElement = document.getElementById('productCategory');
    const descriptionElement = document.getElementById('productDescription');
    const priceElement = document.getElementById('productPrice');
    const addToCartButton = document.getElementById('addToCart');

    if (existsInCart) {
        addToCartButton.textContent = 'Remove From Cart';
        addToCartButton.addEventListener('click', handleRemoveFromCart);
    } else {
        addToCartButton.textContent = 'Add To Cart';
        addToCartButton.addEventListener('click', handleAddToCart);
    }

    imageElement.src = image;
    nameElement.textContent = title;
    nameElement.style.fontWeight = 'bold';
    nameElement.style.fontSize = '20px';
    categoryElement.textContent = category;
    categoryElement.style.fontWeight = 'bold';
    categoryElement.style.fontSize = '20px';
    categoryElement.style.color = '#427D9D';
    descriptionElement.textContent = description;
    priceElement.textContent = `${price}$`;

    createStars(rating);
}

// cart icon click
const cartIcon = document.querySelector('.cart-icon');
cartIcon.addEventListener('click', () => {
    window.open('./cart.html', '_blank');
});