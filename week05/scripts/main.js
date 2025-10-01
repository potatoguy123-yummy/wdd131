const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");
const localstorageKey = "BOM";

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Add chapter button
button.addEventListener("click", () => {
    const value = input.value.trim();
    input.value = "";
    input.focus();
    if (value === "") {
        return;
    }
    chaptersArray.push(value);
    displayList(value);
    setChapterList();
})

function displayList(chapter) {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");

    li.textContent = chapter;
    deleteButton.textContent = "❌";

    li.appendChild(deleteButton);
    list.appendChild(li);

    deleteButton.addEventListener("click", () => {
        li.remove();
        deleteChapter(chapter);
    })
}

function deleteChapter(chapter) {
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}

function setChapterList() {
    localStorage.setItem(localstorageKey, JSON.stringify(chaptersArray));
}

function getChapterList() {
    try {
        const result = localStorage.getItem(localstorageKey);
        const json = JSON.parse(result);
        if (!Array.isArray(json)) {
            throw new TypeError(`Localstorage ${localstorageKey} key was not an array.`);
        }
        return json;
    } catch(e) {
        console.log("Could not parse value:", e);
    }
}
