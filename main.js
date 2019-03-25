const searchInput = document.querySelector('#search');
const suggestions = document.querySelector('.suggestions');
const emojis = document.querySelector('#ketomojis');
const items = [];
const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
getResults();

function getResults() {
    fetch("keto_emojis.json")
    .then(response => response.json())
    .then(data => items.push(...data))
    .catch(function(error) {
        console.log(error);
    })
}

function findMatches(itemToMatch, items) {
    const regex = new RegExp(itemToMatch, 'gi');
    return items.filter(item => {
        return item.name.match(regex);
    })
}

function displayMatches() {
    if (this.value === "") {
        hideMatches();
    } else {
        suggestions.classList.remove("hide");
        suggestions.innerHTML = renderResults(this.value);
        attachEventListenersToResults();
    }
}

function renderResults(inputValue) {
    const matches = findMatches(inputValue, items);
    return matches.map(item => {
        const regex = new RegExp(inputValue, 'gi');
        const itemName = item.name.replace(regex, `<span class="highlight">${inputValue}</span>`);
        return (`
        <li><a href="#" data-code="${item.code}">${itemName}</a></li>
        `);
    }).join('');
}

function hideMatches() {
    setTimeout(function(){ suggestions.classList.add("hide"); }, 200);
}

function addItems(event) {
    const item = event.currentTarget.dataset.code;
    selectedItems.push(item);
    saveItems();
    displayEmojis();
}

function saveItems() {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
}

function displayEmojis() {
    emojis.innerHTML = selectedItems.map(item => {
        return (`
        <p>${item}</p>
        `);
    }).join('');
}

function attachEventListenersToResults() {
    const results = suggestions.querySelectorAll('li a');
    results.forEach(result => {
        result.addEventListener("click", addItems);
    })
}

searchInput.addEventListener("keyup", displayMatches);
searchInput.addEventListener("focusin", displayMatches);
searchInput.addEventListener("blur", hideMatches);
document.addEventListener('DOMContentLoaded', displayEmojis);