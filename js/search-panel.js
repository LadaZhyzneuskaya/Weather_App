let citiesArray = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [];
setDataInStorage();
const searchArray = JSON.parse(localStorage.getItem('cities'));

searchArray.forEach(city => {
  const searchItem = createSearchItems(city);
  searchListElement.append(searchItem);
});

// =============== LI ===============

// const searchCityElement = document.querySelectorAll('[data-name]');
// console.log('searchCityElement', searchCityElement);

searchListElement.addEventListener('click', (event) => {
  const searchCityElement = event.target.closest('li');

  if (!event.target.classList.contains('item_close-button_icon')) {
    const cityName = searchCityElement.dataset.name;
    getData(cityName);
    return;
  }

  const cityName = searchCityElement.dataset.name;
  console.log('searchCityElement', cityName);
  searchCityElement.remove();

  const indexOfSityInArray = citiesArray.indexOf(cityName);
  citiesArray.splice(indexOfSityInArray, 1);
  setDataInStorage();

  toggleClearStorageButtonStatus();
});

function toggleClearStorageButtonStatus() {
  if (searchListElement.children.length > 0) {
    clearStorageButton.classList.remove('hidden');
  } else {
    clearStorageButton.classList.add('hidden');
  }
}

// =============== HINT ABOUT SEARCH ERROR ===============

let hint;

function showMessage() {
  console.log(messageElement)
  messageElement.classList.remove('container-search__message--turn-opacity');
}

// =============== STORAGE ===============

function checkTheSameItem(inputValue) {
  // console.log('citiesArray', citiesArray);

  if(inputValue === '') {
    showError();
    return;
  }

  if(!citiesArray.includes(`${inputValue}`)) {
    citiesArray.push(inputValue);
    setDataInStorage();

    if (localStorage.getItem('cities')) {
      const searchItem = createSearchItems(inputValue);
      searchListElement.append(searchItem);
    }

  } else {
    console.log('DONT', citiesArray);
    return;
  }
}

function setDataInStorage() {
  localStorage.setItem('cities', JSON.stringify(citiesArray));
}

clearStorageButton.addEventListener('click', () => {
  localStorage.clear();
  citiesArray = [];

  while (searchListElement.firstChild) {
    searchListElement.removeChild(searchListElement.firstChild);
  };

  toggleClearStorageButtonStatus();
});