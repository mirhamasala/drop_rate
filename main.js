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
        .then(data => {
            data.Search.forEach(result => {
                ketoFoods.push(result.Title);
            })
        })
        .catch(function(error) {
        console.log(error);
    })
// }

function findMatches(foodToMatch, ketoFoods) {
    const regex = new RegExp(foodToMatch, 'gi');
    return ketoFoods.filter(food => {
        return food.match(regex);
    })
}

function displayMatches(e) {
    if(e.target.value === "") {
        hideMatches();
    } else {
        suggestions.classList.remove("hide");
        const matches = findMatches(this.value, ketoFoods);
        const html = matches.map(food => {
            const regex = new RegExp(this.value, 'gi');
            const foodName = food.replace(regex, `<span class="highlight">${this.value}</span>`);
            return `
            <li><a href="#">${foodName}</a></li>
           `;
        }).join('');
        suggestions.innerHTML = html;
    }
}

function hideMatches() {
    setTimeout(function(){ suggestions.classList.add("hide"); }, 100);
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener("keyup", displayMatches);
searchInput.addEventListener("focusin", displayMatches);
searchInput.addEventListener("blur", hideMatches);
