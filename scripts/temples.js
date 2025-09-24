const date = new Date();
const currentYear = date.getFullYear();
document.getElementById("currentyear").innerText = currentYear;
document.getElementById("lastModified").innerText = document.lastModified;

const hamburgerContainer = document.querySelector(".hamburger-container");
const nav = document.querySelector("nav");
hamburgerContainer.addEventListener("click", (e) => {
    const child = hamburgerContainer.firstElementChild;
    child.classList.toggle("hamburger-button");
    child.classList.toggle("x-button");
    nav.classList.toggle("nav-hidden");
});

