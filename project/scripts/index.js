const res = await fetch("scripts/parts.json");
const urlParams = new URLSearchParams(window.location.search);
let parts = await res.text();
try {
    parts = JSON.parse(parts);
} catch(e) {
    alert("Could not load list of part numbers!");
    console.error(e);
    throw e;
}

const cat = urlParams.get("cat");
const query = urlParams.get("query");
const kit = urlParams.get("kit");
if (cat && validCategory(cat)) {
    displayCategory(cat);
} else if (query && typeof query === "string") {
    displaySearchResult(query);
} else if (kit && getKit(kit)) {
    displayKit(kit);
} else {
    displayHomescreen();
}

function addPartToElem(part, elem, text, href) {
    const div = document.createElement("div");
    div.classList.add("product-card");
    const a = document.createElement("a");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = part.image;
    img.alt = part.name;
    img.loading = "lazy";
    a.href = href;
    figcaption.textContent = text;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    a.appendChild(figure);
    div.appendChild(a);
    elem.appendChild(div);
}

function displayHomescreen() {
    const categories = [];
    const catElement = document.querySelector("#category");
    const kitElement = document.querySelector("#kits");
    document.querySelector(".kit").classList.remove("hidden");
    function addPart(part) {
        if (!part.kit) {
            const cat = part.category.toLowerCase();
            if (categories.includes(cat)) {
                return;
            }
            categories.push(cat);
        }
        const elem = part.kit ? kitElement : catElement;
        const key = part.kit ? "kit" : "cat";
        const keyValue = part.kit ? part.kitNumber : part.category;
        const action = `?${key}=${keyValue}`;
        const text = part.kit ? part.name : part.category;

        addPartToElem(part, elem, text, action);
    }

    parts.forEach(addPart);
}

function displayCategory(category) {
    const items = parts.filter(part => !part.kit && part.category.toLowerCase() === category.toLowerCase());
    const catElement = document.querySelector("#category");
    function addPart(part) {
        const action = `part.html?part=${part.partNumber}`;

        addPartToElem(part, catElement, part.name, action);
    }

    items.forEach(addPart);

    const catHeader = document.querySelector(".cat h2");
    catHeader.textContent = category;

    showBackButton();
}

function showBackButton() {
    const backButton = document.querySelector(".back");
    backButton.classList.remove("hidden");
}

function validCategory(category) {
    if (typeof category !== "string") return false;
    category = category.toLowerCase();
    return parts.some(part => !part.kit && part.category.toLowerCase() === category);
}

function getKit(kit) {
    kit = parseInt(kit);
    if (isNaN(kit)) return null;
    return parts.filter(part => part.kit && part.kitNumber === kit)[0] || null;
}

function getPart(partNumber) {
    partNumber = parseInt(partNumber);
    if (isNaN(partNumber)) return null;
    return parts.filter(part => !part.kit && part.partNumber === partNumber)[0] || null;
}

function displaySearchResult(query) {
    const matchKey = query.toLowerCase().replaceAll(" ", "");
    const items = parts.filter(part => {
        if (part.kit) return false;
        const name = part.name.toLowerCase().replaceAll(" ", "");
        return name.includes(matchKey);
    });

    const catElement = document.querySelector("#category");
    function addPart(part) {
        const action = `part.html?part=${part.partNumber}`;

        addPartToElem(part, catElement, part.name, action);
    }

    if (items.length === 0) {
        const p = document.createElement("p");
        p.textContent = "No results found.";
        catElement.appendChild(p);
    } else {
        items.forEach(addPart);
    }
    
    const catHeader = document.querySelector(".cat h2");
    catHeader.textContent = `Search results for: '${query}'`;
    showBackButton();
    document.title = "BuildTech Supply - Search Results";
}

function displayKit(kit) {
    kit = getKit(kit);
    const items = kit.parts.map(partNumber => getPart(partNumber)).filter(part => {
        if (!part) {
            console.warn("WARNING: Kit referenced part number that does not exist!!!");
            return false;
        }
        return true;
    });
    const catElement = document.querySelector("#category");
    function addPart(part) {
        const action = `part.html?part=${part.partNumber}`;

        addPartToElem(part, catElement, part.name, action);
    }

    if (items.length === 0) {
        const p = document.createElement("p");
        p.textContent = "No results found.";
        catElement.appendChild(p);
    } else {
        items.forEach(addPart);
    }
    
    const catHeader = document.querySelector(".cat h2");
    catHeader.textContent = `${kit.name} Kit`;
    showBackButton();
    document.title = "BuildTech Supply - Kit";
}
