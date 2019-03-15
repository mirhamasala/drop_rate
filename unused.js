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

// Close menu when you click anywhere else on the page
// except the input and menu
function hideMatches(e) {
    if (e.target === body) {
        suggestions.classList.add("hide");
    } else {
        return;
    }
}

const body = document.body;
body.addEventListener("click", hideMatches);
