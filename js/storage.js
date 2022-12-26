let citiesArray = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [];
setDataInStorage();
const searchArray = JSON.parse(localStorage.getItem('cities'));

searchArray.forEach(city => {
  const searchItem = createSearchItems(city);
  searchListElement.append(searchItem);
});

function checkTheSameItem(inputValue) {
  // console.log('citiesArray', citiesArray);

  if(inputValue === '') {
    alert('Please, enter city name!');
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
});