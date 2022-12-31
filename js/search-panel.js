let citiesArray = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [];
setDataInStorage();
let searchArray = JSON.parse(localStorage.getItem('cities'));

searchArray.forEach(city => {
  const searchItem = createSearchItems(city);
  searchListElement.append(searchItem);
  // console.log('create + append', searchArray);
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
  // console.log('searchCityElement', cityName);
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
  // console.log(messageElement);
  messageElement.classList.remove('container-search__message--turn-opacity');
}

// =============== STORAGE ===============

function checkItem(inputValue) {
  // console.log('citiesArray', citiesArray);

  if(inputValue === '') {
    showMessage();
    return;
  }

  if(!messageElement.classList.contains('container-search__message--turn-opacity')) {
    console.log('MESSAGE');
  }

  if(citiesArray.length < 10 && !citiesArray.includes(`${inputValue}`)) {
    citiesArray.unshift(inputValue);
    setDataInStorage();
    // console.log('<5', citiesArray);

    if (localStorage.getItem('cities')) {
      const searchItem = createSearchItems(inputValue);
      searchListElement.prepend(searchItem);
    }

  } else if (citiesArray.length >= 10 && !citiesArray.includes(`${inputValue}`)) {
    // console.log('HI', citiesArray, searchArray);
    citiesArray.pop();
    citiesArray.unshift(inputValue);
    setDataInStorage();

    searchArray = JSON.parse(localStorage.getItem('cities'));
    const searchListChildren = searchArray.map(createSearchItems);
    replaceChildren(searchListElement, searchListChildren);
    
    console.log('DONT', citiesArray, searchArray);
    
  } else {
    console.log('You shall not pass, Povtoriashka!!! :)');
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

function checkInvalidValue(inputValue, response) {
  if(response.status !== 200) {
    console.log('CHECK', inputValue);
  }
}