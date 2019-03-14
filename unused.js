
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
