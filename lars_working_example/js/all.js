const searchInput = document.querySelector('#q');
const searchDropdown = document.querySelector('.search-dropdown');
const resultsWrapper = document.querySelector('.results-wrapper');
const items = JSON.parse(localStorage.getItem('items')) || [];
let itemId = JSON.parse(localStorage.getItem('index')) || 0;

function setTheStage() {
  items.forEach((item, index) => {
    renderResult(item, index);
  })
}

function incrementId() {
  itemId = itemId + 1;
  localStorage.setItem('index', JSON.stringify(itemId));
}

function clearResults() {
  searchDropdown.innerHTML = "";
}

function saveItems() {
  localStorage.setItem('items', JSON.stringify(items));
}

function displayResults(parsedResponse) {
  parsedResponse.data.forEach((item, index) => {
    const formattedTitle = item.title.trim().substr(0,1).toUpperCase() + item.title.trim().substr(1,item.title.length);
    searchDropdown.insertAdjacentHTML('beforeend', `
      <li style="animation-delay: ${index * 50}ms;">
        <a href="#" data-image="${item.images.downsized_medium.url}" data-title="${formattedTitle}">
          <span>
            ${formattedTitle}
          </span>
          <i class="fas fa-plus"></i>
        </a>
      </li>
      `)
  })
}

function renderResult(item, index) {
  resultsWrapper.insertAdjacentHTML('beforeend', `
    <div class="result" style="background-image:url('${item.image}');animation-delay:${index * 100}ms;">
      <div class="overlay">
        <i class="fas fa-times remove" data-index="${item.id}"></i>
        <strong>
          ${item.title}
        </strong>
        <div class="stars ${item.rating > 0 ? 'rated' : ''}" data-index="${item.id}">
          <i class="fas fa-star ${item.rating === 1 ? 'active' : ''}" data-value="1"></i>
          <i class="fas fa-star ${item.rating === 2 ? 'active' : ''}" data-value="2"></i>
          <i class="fas fa-star ${item.rating === 3 ? 'active' : ''}" data-value="3"></i>
          <i class="fas fa-star ${item.rating === 4 ? 'active' : ''}" data-value="4"></i>
          <i class="fas fa-star ${item.rating === 5 ? 'active' : ''}" data-value="5"></i>
        </div>
      </div>
    </div>
    `)
  applyRatingEventListeners();
}

function applyRatingEventListeners() {
  document.querySelectorAll('.result .stars .fas').forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const id = Number.parseInt(event.currentTarget.parentElement.dataset.index);
      const itemIndex = items.findIndex(item => item.id === id);
      items[itemIndex].rating = Number.parseInt(event.currentTarget.dataset.value);
      saveItems();
      event.currentTarget.parentElement.classList.add('rated');
      event.currentTarget.parentElement.querySelectorAll('.fas').forEach((item) => {
        item.classList.remove('active');
      })
      event.currentTarget.classList.add('active');
    })
  })
  document.querySelectorAll('.result .overlay .remove').forEach((item) => {
    item.addEventListener('click', (event) => {
      const idForRemove = Number.parseInt(event.currentTarget.dataset.index);
      const indexForRemove = items.findIndex(item => item.id === idForRemove);
      if(indexForRemove === -1) {
        return
      }
      items.splice(indexForRemove, 1);
      saveItems();
      resultsWrapper.innerHTML = "";
      items.forEach((item, index) => {
        renderResult(item, index);
      })
    })
  })
}

function applyResultEventListeners() {
  searchDropdown.querySelectorAll('a').forEach((item) => {
    item.addEventListener('click',(event) => {
      event.preventDefault();
      incrementId();
      const item = {
        id: itemId,
        title: event.currentTarget.dataset.title, 
        image: event.currentTarget.dataset.image,
        rating: 0
      }
      renderResult(item, 0);
      items.push(item);
      saveItems();
    })
  })
}

function getResults(event) {
  const query = event.currentTarget.value;
  const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=mdOEurpRKHYZZilfsXO7DV1vbdDsZSdU&q=${query}&limit=5&offset=0&rating=G&lang=en`
  fetch(giphyUrl)
  .then(response => response.json())
  .then((parsedResponse) => {
    clearResults();
    searchDropdown.classList.remove('hidden');
    displayResults(parsedResponse);
    applyResultEventListeners();
  }); 
}

function hideResults(event) {
  setTimeout(function(){searchDropdown.classList.add('hidden')}, 200)
}

function showResults(event) {
  searchDropdown.classList.remove('hidden');
}

searchInput.addEventListener('keyup', getResults);
searchInput.addEventListener('focusout', hideResults);
searchInput.addEventListener('focusin', showResults);
document.addEventListener('DOMContentLoaded', setTheStage);


