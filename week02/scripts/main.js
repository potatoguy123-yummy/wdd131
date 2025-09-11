const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");


// Add chapter button
button.addEventListener("click", () => {
    const value = input.value.trim();
    input.value = "";
    input.focus();
    if (value === "") {
        return;
    }
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");

    li.textContent = value;
    deleteButton.textContent = "❌";

    li.appendChild(deleteButton);
    list.appendChild(li);

    deleteButton.addEventListener("click", () => {
        li.remove();
    })
})