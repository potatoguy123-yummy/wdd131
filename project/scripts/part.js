const res = await fetch("scripts/parts.json");
let parts = await res.text();
try {
    parts = JSON.parse(parts);
} catch(e) {
    alert("Could not load list of part numbers!");
    console.error(e);
    throw e;
}
const urlParams = new URLSearchParams(window.location.search);

const part = parseInt(urlParams.get("part"));
const partInfo = getPart(part);
if (!partInfo) {
    window.location.href = "./";
} else {
    populatePageInformation(partInfo);
}

function getPart(partNumber) {
    if (typeof partNumber !== "number" || isNaN(partNumber)) return false;
    return parts.find(part => !part.kit && part.partNumber === partNumber) || null;
}

function addElementToSpecsList(textValue) {
    const list = document.getElementById("specs");
    const li = document.createElement("li");
    li.textContent = textValue;
    list.appendChild(li);
}

function populatePageInformation(part) {
    document.getElementById("partname").textContent = part.name;
    document.getElementById("description").textContent = part.description;
    for (const k in part.details) {
        const details = `${k}: ${part.details[k]}`;
        addElementToSpecsList(details);
    }
    if (Object.keys(part.details).length === 0) {
        document.getElementById("specsContainer").remove();
    }
    const img = document.createElement("img");
    img.src = part.image;
    img.loading = "lazy";
    img.alt = part.name;
    document.querySelector("main .image").appendChild(img);
}
