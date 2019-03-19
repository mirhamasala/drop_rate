const searchInput = document.querySelector('#search');
const suggestions = document.querySelector('.suggestions');
const images = document.querySelector('#images');
let tag = "";
const myCollection = [];

// GETS DATA FROM THE API
function getResults(url) {
    fetch(url)
    .then(response => response.json())
    .then(processResult)
    .catch(function(error) {
        console.log(error);
    })
}

// RENDERS AN ITEM TO THE PAGE
function renderResult(item) {
    const regex = new RegExp(tag, 'gi');
    const itemName = item.Title.replace(regex, `<span class="highlight">${tag}</span>`);
    return (`
        <li><a href="#" data-image="${item.Poster}" data-item='${JSON.stringify(item)}'>${itemName}</a></li>
        `);
}

// ATTACH EVENT LISTENER TO NEWLY RENDERED ITEM
function attachEventListenersToResults() {
    const results = suggestions.querySelectorAll('li a');
    results.forEach(result => {
        result.addEventListener("click", addToCollection);
    })
}

// HIDE RESULTS LIST
function hideResults() {
    setTimeout(function(){ suggestions.classList.add("hide"); }, 200);
}

// SHOW RESULTS LIST
function showResults() {
    suggestions.classList.remove("hide");
}

//// EVENT HANDLERS

// ADD CLICKED ITEM TO COLLECTION CONST
function addToCollection(event) {
    event.preventDefault();
    const item = JSON.parse(event.currentTarget.dataset.item);
    myCollection.push(item);
    const html = myCollection.map(result => {
        return (`
            <img src="${item.Poster}">
            `);
    }).join('');
    images.innerHTML = html;
}

// PROCESS API RESPONSE
function processResult(data) {
    if(data.Response != "True") {
        return;
    }
    suggestions.innerHTML = "";
    data.Search.forEach((item) => {
        suggestions.insertAdjacentHTML('beforeend', renderResult(item));
    })
    attachEventListenersToResults();
}

// CALL API ON KEYUP SEARCH INPUT
function handleKeyUp(event) {
    tag = event.currentTarget.value;
    if(tag === "") {
        hideResults();
        return;
    }
    const url = `https://www.omdbapi.com/?s=${tag}&apikey=adf1f2d7`;
    getResults(url);
}

//// EVENT LISTENERS

searchInput.addEventListener("keyup", handleKeyUp);
searchInput.addEventListener("focusin", showResults);
searchInput.addEventListener("blur", hideResults);