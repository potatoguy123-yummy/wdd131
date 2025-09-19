
const date = new Date();
const currentYear = date.getFullYear();

document.getElementById("currentyear").innerText = currentYear;
document.getElementById("lastModified").innerText = document.lastModified;

function calculateWindChill(temp, wind) {
    return 35.74 + (0.6215 * temp) - (35.75 * (wind ** 0.16)) + (0.4275 * temp * (wind ** 0.16));
}

const temperature = 87; // fahrenheit °F
const conditions = "Partly Cloudy";
const wind = 8; // mph
const chill = wind > 3 && temperature <= 50 ? calculateWindChill() : "N/A";

document.getElementById("temperature").textContent = temperature + "°F";
document.getElementById("conditions").textContent = conditions;
document.getElementById("wind").textContent = wind + "mph";
document.getElementById("chill").textContent = chill;
