const products = ["Laptop"];
const productSelect = document.getElementById("product");
const date = new Date();
const currentYear = date.getFullYear();

document.getElementById("currentyear").innerText = currentYear;
document.getElementById("lastModified").innerText = document.lastModified;

products.forEach(product => {
    const option = document.createElement("option");
    option.value = product;
    option.text = product;
    productSelect.appendChild(option);
});