let citiesArray = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [];
setDataInStorage();
let searchArray = JSON.parse(localStorage.getItem('cities'));

// if(true) {}
searchArray.forEach(city => {
  const searchItem = createSearchItems(city);
  searchListElement.append(searchItem);
  console.log('create + append', searchArray);
});

// function addSearchItemsToPage() {
//   searchArray.forEach(city => {
//     const searchItem = createSearchItems(city);
//     searchListElement.append(searchItem);
//     console.log('create + append', searchArray);
// });
// }

// =============== LI ===============

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

function showMessage() {
  console.log(messageElement);
  messageElement.classList.remove('container-search__message--turn-opacity');
}

// =============== STORAGE ===============

function checkItem(inputValue) {
  // console.log('citiesArray', citiesArray);

  if(inputValue === '') {
    showError();
    return;
  }

  if(citiesArray.length < 10 && !citiesArray.includes(`${inputValue}`)) {
    citiesArray.push(inputValue);
    setDataInStorage();
    console.log('<5', citiesArray);

    if (localStorage.getItem('cities')) {
      const searchItem = createSearchItems(inputValue);
      searchListElement.append(searchItem);
    }

  } else {
    citiesArray.shift();
    citiesArray.push(inputValue);
    setDataInStorage();

    searchArray = JSON.parse(localStorage.getItem('cities'));

    const searchListChildren = searchArray.map(createSearchItems);

    replaceChildren(searchListElement, searchListChildren);
    
    console.log('DONT', citiesArray, searchArray);
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