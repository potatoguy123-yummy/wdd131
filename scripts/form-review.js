const date = new Date();
const currentYear = date.getFullYear();
const localstorageKey = "reviewcount";

document.getElementById("currentyear").innerText = currentYear;
document.getElementById("lastModified").innerText = document.lastModified;

let currentCount = parseInt(localStorage.getItem(localstorageKey)) || 0;
currentCount++;
localStorage.setItem(localstorageKey, currentCount);
document.getElementById("review_count").textContent = currentCount;
