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
    return matches;
    // console.log(matches);
}

const searchInput = document.querySelector('.search');

searchInput.addEventListener("keyup", displayMatches);
