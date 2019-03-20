const searchInput = document.querySelector('#search');
const suggestions = document.querySelector('.suggestions');
const emojis = document.querySelector('#ketomojis');
const items = [];
const mySelection = [];
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

function displayMatches(event) {
    if (this.value === "") {
        hideMatches();
    } else {
        suggestions.classList.remove("hide");
        const matches = findMatches(this.value, items);
        const html = matches.map(item => {
            const regex = new RegExp(this.value, 'gi');
            const itemName = item.name.replace(regex, `<span class="highlight">${this.value}</span>`);
        return (`
                <li><a href="#" data-code="${item.code}">${itemName}</a></li>
            `);
        }).join('');
        suggestions.innerHTML = html;
        const results = suggestions.querySelectorAll('li a');
        displayEmojis(results);
    }
}

// function renderResults(matches) {

// }

function hideMatches() {
    setTimeout(function(){ suggestions.classList.add("hide"); }, 100);
}

// function addToCollection(result) {
//     // event.preventDefault();
//     mySelection.push(result);
//     console.log(mySelection);
//     const html = mySelection.map(result => {
//         return (`
//             <p>${result.data.code}</p>
//         `);
//     }).join('');
//     emojis.innerHTML = html;
// }

// function attachEventListenersToResults() {
//     const results = suggestions.querySelectorAll('li a');
//     results.forEach(result => {
//         console.log(result.dataset.code);
//         // result.addEventListener("click", addToCollection);
//     })
// }

function displayEmojis(results) {
    // const results = suggestions.querySelectorAll('li a');
    results.forEach(result => {
            result.addEventListener("click", () => {
                mySelection.push(result);
                const html = mySelection.map(result => {
                    return (`
                        <p>${result.dataset.code}</p>
                    `);
                }).join('');
                emojis.innerHTML = html;
            })
    })
}

searchInput.addEventListener("keyup", displayMatches);
searchInput.addEventListener("focusin", displayMatches);
searchInput.addEventListener("blur", hideMatches);
