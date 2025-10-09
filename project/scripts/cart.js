const res = await fetch("scripts/parts.json");
let parts = await res.text();
try {
    parts = JSON.parse(parts);
} catch(e) {
    alert("Could not load list of part numbers!");
    console.error(e);
    throw e;
}

const list = document.querySelector("#list");

const cart = window.cart.get();
for (const k in cart) {
    const info = getPart(parseInt(k));
    if (info) {
        addToCart(info, cart[k])
    }
}

if (Object.keys(cart).length === 0) {
    document.querySelector(".checkout").remove();

    const div = document.createElement("div");
    div.classList.add("empty-cart");
    const h2 = document.createElement("h2");
    h2.textContent = "Your cart is empty!"
    div.appendChild(h2);

    document.querySelector("main").appendChild(div);
}

function addToCart(part, quantity) {
    const li = document.createElement("li");
    const divImg = document.createElement("image");
    divImg.classList.add("image");
    const divInfo = document.createElement("div");
    divInfo.classList.add("information");
    divInfo.innerHTML = `
        <h2>Part Name: <span id="partname"></span></h2>
        <p id="description" class="description">Long description here</p>
        <p>Total Cost: <span id="price"></span></p>
        <p>Total quantity in cart: <input type="number" title="quantity" id="quantity" value="1" min="1" max="10"></p>
        <div class="bottom">
            <a id="partlocation">View more details</a>
            <a class="remove">Remove from Cart</a>
        </div>
    `;
    li.appendChild(divImg);
    li.appendChild(divInfo);
    list.appendChild(li);

    divInfo.querySelector("#partname").textContent = part.name;
    divInfo.querySelector("#description").textContent = part.description;
    divInfo.querySelector("#quantity").value = quantity;
    divInfo.querySelector("#partlocation").href = `part.html?part=${part.partNumber}`;
    const img = document.createElement("img");
    img.src = part.image;
    img.loading = "lazy";
    img.alt = part.name;
    divImg.appendChild(img);
    divInfo.querySelector("#quantity").addEventListener("change", (e) => {
        window.cart.set(part.partNumber, parseInt(e.target.value));
    })
    divInfo.querySelector(".remove").addEventListener("click", (e) => {
        e.preventDefault();
        li.remove();
        window.cart.delete(part.partNumber);
    })
}

function getPart(partNumber) {
    if (typeof partNumber !== "number" || isNaN(partNumber)) return false;
    return parts.find(part => !part.kit && part.partNumber === partNumber) || null;
}
