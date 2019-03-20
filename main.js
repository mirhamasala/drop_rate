const searchInput = document.querySelector('#search');
const suggestions = document.querySelector('.suggestions');
const images = document.querySelector('#images');
const url = 'https://www.omdbapi.com/?s=harry potter&apikey=adf1f2d7';
const items = [];
const mySelection = [];
getResults();


function getResults() {
    fetch(url)
    .then(response => response.json())
    .then(data => items.push(...data.Search))
    .catch(function(error) {
        console.log(error);
    })
}

function findMatches(itemToMatch, items) {
    const regex = new RegExp(itemToMatch, 'gi');
    return items.filter(item => {
        return item.match(regex);
    })
}

function displayMatches(event) {
    if(event.target.value === "") {
        hideMatches();
    } else {
        suggestions.classList.remove("hide");
        suggestions.innerHTML = renderResults(event.currentTarget.value);
        attachEventListenersToResults();
    }
}

function renderResults(inputValue) {
    return items.map(item => {
        const regex = new RegExp(inputValue, 'gi');
        const itemName = item.Title.replace(regex, `<span class="highlight">${inputValue}</span>`);
        return (`
            <li><a href="#" data-image="${item.Poster}" data-item='${JSON.stringify(item)}'>${itemName}</a></li>
            `);
    }).join('')
}

function hideMatches() {
    setTimeout(function(){ suggestions.classList.add("hide"); }, 200);
}

function addToCollection(event) {
    event.preventDefault();
    const result = JSON.parse(event.currentTarget.dataset.item);
    mySelection.push(result);
    const html = mySelection.map(result => {
        return (`
            <img src="${result.Poster}">
            `);
    }).join('');
    images.innerHTML = html;
}

function attachEventListenersToResults() {
    const results = suggestions.querySelectorAll('li a');
    results.forEach(result => {
        result.addEventListener("click", addToCollection);
    })
}

searchInput.addEventListener("keyup", displayMatches);
searchInput.addEventListener("focusin", displayMatches);
searchInput.addEventListener("blur", hideMatches);