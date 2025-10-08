const urlParams = new URLSearchParams(window.location.search);
const limit = 10;

const form = document.querySelector(".information form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const part = parseInt(urlParams.get("part"));
        const quantity = parseInt(form.querySelector('input[type="number"]').value);
        addPartToCart(part, quantity);
        hideFormShowMessage();
    })
}

function hideFormShowMessage() {
    document.querySelector(".bottom p").classList.remove("hidden");
    document.querySelector(".bottom form").classList.add("hidden");
}

const key = "SHOPPINGCART";

function getCart() {
    try {
        const data = JSON.parse(window.localStorage.getItem(key));
        if (Object.prototype.toString.call(data) !== '[object Object]') {
            throw new TypeError("Item is not an object!");
        }
        return data;
    } catch(e) {
        console.warn(e);
    }
    return {};
}

function setCartData(data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

function addPartToCart(part, quantity) {
    const cartData = getCart();
    console.log(cartData);
    if (isNaN(cartData[part])) {
        cartData[part] = 0;
    }
    cartData[part] += quantity;
    if (cartData[part] > limit) {
        cartData[part] = limit;
    }
    setCartData(cartData);
}

function setPartQty(part, quantity) {
    const cartData = getCart();
    if (isNaN(cartData[part])) {
        cartData[part] = 0;
    }
    cartData[part] = quantity;
    if (cartData[part] > limit) {
        cartData[part] = limit;
    }
    setCartData(cartData);
}

window.cart = {
    get: getCart,
    set: setCartData,
    add: addPartToCart,
    set: setPartQty
}
