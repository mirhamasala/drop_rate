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

function addItems() {
    const item = { text: this };
    selectedItems.push(item);

    displayEmojis(selectedItems);

    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
}

function displayEmojis(selectedItems) {
    emojis.innerHTML = selectedItems.map(item => {
        console.log(item);
        return (`
        <p>${item.text.dataset.code}</p>
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

displayEmojis(selectedItems);