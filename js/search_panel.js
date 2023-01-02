let citiesArray = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [];
setDataInStorage();
let searchArray = JSON.parse(localStorage.getItem('cities'));

searchArray.forEach(city => {
  console.log('searchArray', searchArray);
  const searchItem = createSearchItems(city);
  searchListElement.append(searchItem);
});

searchListElement.addEventListener('click', (event) => {
  const searchCityElement = event.target.closest('li');

  if (!event.target.classList.contains('item_close-button_icon')) {
    const cityName = searchCityElement.dataset.name;
    getData(cityName);
    toggleTodayCards = true;
    toggleClickStatus();
    return;
  }

  const cityName = searchCityElement.dataset.name;
  searchCityElement.remove();

  const indexOfSityInArray = citiesArray.indexOf(cityName);
  citiesArray.splice(indexOfSityInArray, 1);
  setDataInStorage();

  toggleClearStorageButtonStatus();
});

clearStorageButton.addEventListener('click', () => {
  localStorage.clear();
  citiesArray = [];

  while (searchListElement.firstChild) {
    searchListElement.removeChild(searchListElement.firstChild);
  };

  toggleClearStorageButtonStatus();
});

function toggleClearStorageButtonStatus() {
  if (searchListElement.children.length > 0) {
    clearStorageButton.classList.remove('hidden');
  } else {
    clearStorageButton.classList.add('hidden');
  }
}

function checkItem(inputValue) {
  if(inputValue === '') {
    showMessage();
    return;
  }

  if(citiesArray.length < 10 && !citiesArray.includes(`${inputValue}`)) {
    citiesArray.unshift(inputValue);
    setDataInStorage();

    if (localStorage.getItem('cities')) {
      const searchItem = createSearchItems(inputValue);
      searchListElement.prepend(searchItem);
    }

  } else if (citiesArray.length >= 10 && !citiesArray.includes(`${inputValue}`)) {
    citiesArray.pop();
    citiesArray.unshift(inputValue);
    setDataInStorage();

    searchArray = JSON.parse(localStorage.getItem('cities'));
    const searchListChildren = searchArray.map(createSearchItems);
    replaceChildren(searchListElement, searchListChildren);
    
  } else {
    return;
  }
}

function setDataInStorage() {
  localStorage.setItem('cities', JSON.stringify(citiesArray));
}

function showMessage() {
  messageElement.classList.remove('container-search__message--turn-opacity');
  citiesArray.shift();
}