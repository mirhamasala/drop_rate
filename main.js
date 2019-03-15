// const ketoFoods = [
//     "almonds",
//     "almond butter",
//     "almond milk",
//     "avocado",
//     "avocado oil",
//     "broccoli",
//     "cauliflower",
//     "chia seeds",
//     "coconut cream",
//     "coconut milk",
//     "coconut oil",
//     "flax seeds",
//     "grass-fed butter",
//     "hazelnuts",
//     "macadamias",
//     "macadamia butter",
//     "macadamia oil",
//     "olive oil",
//     "raw cacao powder",
//     "spinach"
// ];

const ketoFoods = [];

// function getResults() {
const url = 'http://www.omdbapi.com/?s=harry potter&apikey=adf1f2d7';
fetch(url)
.then(response => response.json())
.then(data => ketoFoods.push(...data.Search))
.catch(function(error) {
    console.log(error);
})
// }

// function findMatches(foodToMatch, ketoFoods) {
//     const regex = new RegExp(foodToMatch, 'gi');
//     return ketoFoods.filter(food => {
//         return food.match(regex);
//     })
// }
const newArray = [];

function displayMatches(e) {
    if(e.target.value === "") {
        hideMatches();
    } else {
        suggestions.classList.remove("hide");
        const html = ketoFoods.map(food => {
            const regex = new RegExp(this.value, 'gi');
            const foodName = food.Title.replace(regex, `<span class="highlight">${this.value}</span>`);
            return (`
            <li><a href="#" data-image="${food.Poster}">${foodName}</a></li>
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
            newArray.push(result);
            const html = newArray.map(result => {
                return (`
                <img src="${result.dataset.image}">
                `);
            }).join('');
            images.innerHTML = html;
        })
    })
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const images = document.querySelector('.images');

searchInput.addEventListener("keyup", displayMatches);
searchInput.addEventListener("focusin", displayMatches);
searchInput.addEventListener("blur", hideMatches);