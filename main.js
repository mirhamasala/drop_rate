const searchInput = document.querySelector("#search");
const suggestions = document.querySelector(".suggestions");
const emojis = document.querySelector("#ketomojis");
const items = [];
const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
getResults();

function getResults() {
    fetch("keto_emojis.json")
    .then(response => response.json())
    .then(data => items.push(...data))
    .catch(function(error) {
        console.log(error);
    })
}

function renderResults() {
    if (this.value === "") {
        hideMatches();
    } else {
        displayMatches(this.value);
        attachEventListenersToMatches();
    }
}

function displayMatches(inputValue) {
    suggestions.classList.remove("hide");
    const matches = findMatches(inputValue, items);
    suggestions.innerHTML = matches.map(item => {
        const regex = new RegExp(inputValue, "gi");
        const itemName = item.name.replace(regex, `<span class="highlight">${inputValue}</span>`);
        return (`
        <li><a href="#" data-code="${item.code}">${itemName}</a></li>
        `);
    }).join('');
}

function findMatches(itemToMatch, items) {
    const regex = new RegExp(itemToMatch, "gi");
    return items.filter(item => {
        return item.name.match(regex);
    })
}

function hideMatches() {
    setTimeout(function(){ suggestions.classList.add("hide"); }, 200);
}

function attachEventListenersToMatches() {
    const matches = suggestions.querySelectorAll("li a");
    matches.forEach(match => {
        match.addEventListener("click", addItems);
    })
}

function addItems(event) {
    const item = event.currentTarget.dataset.code;
    selectedItems.push(item);
    saveItems();
    displayEmojis();
}

function saveItems() {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}

function displayEmojis() {
    emojis.innerHTML = selectedItems.map(item => {
        return (`
        <p>${item}</p>
        `);
    }).join('');
}

searchInput.addEventListener("keyup", renderResults);
searchInput.addEventListener("focusin", renderResults);
searchInput.addEventListener("blur", hideMatches);
document.addEventListener("DOMContentLoaded", displayEmojis);