const ketoFoods = [
    "almonds",
    "almond butter",
    "almond milk",
    "avocado",
    "avocado oil",
    "broccoli",
    "cauliflower",
    "chia seeds",
    "coconut cream",
    "coconut milk",
    "coconut oil",
    "flax seeds",
    "grass-fed butter",
    "hazelnuts",
    "macadamias",
    "macadamia butter",
    "macadamia oil",
    "olive oil",
    "raw cacao powder",
    "spinach"
];

function findMatches(foodToMatch, ketoFoods) {
    const regex = new RegExp(foodToMatch, 'gi');
    return ketoFoods.filter(food => {
        return food.match(regex);
    })
}

function displayMatches() {
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

function hideMatches() {
    suggestions.classList.add("hide");
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
