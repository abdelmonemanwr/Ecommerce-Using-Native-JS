let productsYouHave = document.querySelector("#productsYouHave");

function getCartFromLocalStorage() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

function showProductsYouHaveAdded() {
    let products = getCartFromLocalStorage();
    if (products.length > 0) {
    let checkout = document.querySelector(".checkout");
    checkout.style.display = "block";

    products.forEach((product, index) => {
        addProduct(product, index);
    });
    } else {
    let noProductsDiv = document.createElement("div");
    noProductsDiv.className = "no-products";
    let imageElement = document.createElement("img");
    imageElement.src = "images/emptyCart.png";
    imageElement.alt = "Empty cart image";
    imageElement.className = "empty-cart-image";
    noProductsDiv.appendChild(imageElement);
    productsYouHave.appendChild(noProductsDiv);
    }
}

function increaseProdQuantByOne(index, product, quantityValueDiv, totalPriceDiv) {
    product.quantity += 1;
    quantityValueDiv.textContent = product.quantity;
    totalPriceDiv.textContent = (product.price * product.quantity) + "$";

    updateLocalStorage(product);
}

function decreaseProdQuantByOne(index, product, quantityValueDiv, totalPriceDiv) {
    if (product.quantity > 1) {
    product.quantity -= 1;
    quantityValueDiv.textContent = product.quantity;
    totalPriceDiv.textContent = (product.price * product.quantity) + "$";

    updateLocalStorage(product);
    } else {
    deleteFromCart(index);
    }
}

function addProduct(product, index) {
    let cartProduct = document.createElement("div");
    cartProduct.className = "cart-product";

    let imgDiv = document.createElement("div");
    imgDiv.className = "img-div";

    let image = document.createElement("img");
    image.className = "prodImage";
    image.src = product.image;
    imgDiv.appendChild(image);

    let priceValueDiv = document.createElement("div");
    let priceParagraph = document.createElement("p");
    priceParagraph.innerText = product.price + "$";
    priceValueDiv.appendChild(priceParagraph);

    let productCount = document.createElement("div");
    productCount.className = "product-count";

    let quantityValueDiv = document.createElement("div");
    quantityValueDiv.innerHTML = product.quantity;

    let totalPriceDiv = document.createElement("div");
    totalPriceDiv.textContent = "Total Price: " + (product.price * product.quantity) + "$";
    totalPriceDiv.style.fontSize = "20px";
    totalPriceDiv.style.fontWeight = "bold";

    let plusIconDiv = document.createElement("div");
    plusIconDiv.innerHTML = '<i class="fal fa-plus plus"></i>';
    
    plusIconDiv.addEventListener("click", ()=>{
        increaseProdQuantByOne(index, product, quantityValueDiv, totalPriceDiv);
    });

    let minusIconDiv = document.createElement("div");
    minusIconDiv.innerHTML = '<i class="fal fa-minus minus"></i>';
    minusIconDiv.addEventListener("click", () => decreaseProdQuantByOne(index, product, quantityValueDiv, totalPriceDiv));

    let rmvIconDiv = document.createElement("div");
    rmvIconDiv.className = "rmvIconDiv";
    rmvIconDiv.innerHTML = '<i class="fal fa-trash-alt remove"></i>';
    rmvIconDiv.style.cursor = "pointer";

    rmvIconDiv.addEventListener("click", () => deleteFromCart(index));


    productCount.append(plusIconDiv, quantityValueDiv, minusIconDiv);
    productCount.style.marginTop = "15px";

    let mul = document.createElement("div");
    mul.className = "mul";
    mul.innerHTML = "×";

    let equal = document.createElement("div");
    equal.className = "equal";
    equal.innerHTML = "=";

    cartProduct.append(imgDiv, productCount, mul, priceValueDiv, equal, totalPriceDiv, rmvIconDiv);

    let productsYouHave = document.getElementById("productsYouHave");
    productsYouHave.appendChild(cartProduct);
}

function deleteFromCart(index) {
    let cartProducts = document.querySelectorAll(".cart-product");
    let removedProduct = cartProducts[index];
    removedProduct.remove();
    deleteProductfromLocalStorage(index);
}

function deleteProductfromLocalStorage(index) {
    let products = getCartFromLocalStorage();
    products.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(products));
    swal({
        title: "Product Removed from cart",
        icon: "success",
        button: "ok",
    }).then(()=>{
        location.reload();
    });
}

function updateLocalStorage(product) {
    let products = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < products.length; i++) {
    if (products[i].id === product.id) {
        products.splice(i, 1, product);
        localStorage.setItem("cart", JSON.stringify(products));
        break;
    }
    }
}

let checkout = document.querySelector('.checkout');
checkout.addEventListener('click', function () {
    let products = getCartFromLocalStorage();
    let total = 0;

    products.forEach(product => {
    total += product.price * product.quantity;
    });

    swal({
        title: "Total price",
        text: `$${total.toFixed(2)}`,
        icon: "success",
        button: "ok",
    }).then(() => {
        localStorage.removeItem('cart');
        location.reload();
    });
});

showProductsYouHaveAdded();