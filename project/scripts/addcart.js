const form = document.querySelector(".information form");
const urlParams = new URLSearchParams(window.location.search);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const part = parseInt(urlParams.get("part"));
    const quantity = parseInt(form.querySelector('input[type="number"]').value);
    console.log(quantity, part);
})
