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
        const html = items.map(item => {
            const regex = new RegExp(this.value, 'gi');
            const itemName = item.Title.replace(regex, `<span class="highlight">${this.value}</span>`);
            return (`
                <li><a href="#" data-image="${item.Poster}">${itemName}</a></li>
                `);
        }).join('');
        suggestions.innerHTML = html;
        const results = suggestions.querySelectorAll('li a');
        showImages(results);
    }
}

function hideMatches() {
    setTimeout(function(){ suggestions.classList.add("hide"); }, 100);
}

function showImages(results) {
    results.forEach(result => {
        result.addEventListener("click", () => {
            mySelection.push(result);
            const html = mySelection.map(result => {
                return (`
                    <img src="${result.dataset.image}">
                    `);
            }).join('');
            images.innerHTML = html;
        })
    })
}

searchInput.addEventListener("keyup", displayMatches);
searchInput.addEventListener("focusin", displayMatches);
searchInput.addEventListener("blur", hideMatches);