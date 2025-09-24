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
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Dallas Texas",
    location: "Dallas, Texas, United States",
    dedicated: "1984, October, 19",
    area: 44207,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/dallas-texas/2018/400x250/Dallas-Texas-Temple10.jpg"
  },
  {
    templeName: "Toronto Ontario",
    location: "Toronto, Ontario, Canada",
    dedicated: "1990, August, 25",
    area: 55558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/toronto-ontario/400x250/toronto-temple-lds-235671-wallpaper.jpg"
  },
  {
    templeName: "Fukuoka Japan",
    location: "Fukuoka, Japan",
    dedicated: "2000, June, 11",
    area: 10700,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/fukuoka-japan/400x250/fukuoka-japan-temple-lds-306863-wallpaper.jpg"
  }
];

const filters = {
    old: (temple) => {
        let dedicated = parseInt(temple.dedicated.split(",")[0]);
        return dedicated < 1900;
    },
    new: (temple) => {
        let dedicated = parseInt(temple.dedicated.split(",")[0]);
        return dedicated > 2000;
    },
    large: (temple) => {
        return temple.area > 90000;
    },
    small: (temple) => {
        return temple.area < 10000;
    }
}

let lastRender = null;

function displayArray(temples, render) {
    if (render === lastRender) return;
    lastRender = render;
    const element = document.querySelector(".temples");
    element.textContent = "";
    temples.forEach(temple => {
        const figure = document.createElement("figure");
        const caption = document.createElement("figcaption");
        const image = document.createElement("img");

        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";
        caption.innerHTML = `<h2>${temple.templeName}</h2>
<ul>
    <li><span>Location:</span> ${temple.location}</li>
    <li><span>Dedicated:</span> ${temple.dedicated}</li>
    <li><span>Size:</span> ${temple.area} sq ft</li>
</ul>`;

        figure.appendChild(caption);
        figure.appendChild(image);
        element.appendChild(figure);
        
    })
}

document.getElementById("nav-home").addEventListener("click", e => {
    e.preventDefault();
    displayArray(temples, "home");
})

document.getElementById("nav-old").addEventListener("click", e => {
    e.preventDefault();
    const results = temples.filter(filters.old);
    displayArray(results, "old");
})

document.getElementById("nav-new").addEventListener("click", e => {
    e.preventDefault();
    const results = temples.filter(filters.new);
    displayArray(results, "new");
})

document.getElementById("nav-large").addEventListener("click", e => {
    e.preventDefault();
    const results = temples.filter(filters.large);
    displayArray(results, "large");
})

document.getElementById("nav-small").addEventListener("click", e => {
    e.preventDefault();
    const results = temples.filter(filters.small);
    displayArray(results, "small");
})

displayArray(temples, "home");
