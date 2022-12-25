const citiesArray = [];
let cities = [];

function setDataInStorage(cityName) {
  localStorage.setItem('cities', JSON.stringify(citiesArray));
  const cities = JSON.parse(localStorage.getItem('cities'));

  addSearchItemsToPage(cities);
  console.log('STORAGE!', cities);
}

function addSearchItemsToPage(cities) {
cities.forEach(city => {
    const searchItems = createSearchItems(city);
    searchListElement.append(searchItems);
  });
}

if (localStorage.getItem('cities')) {
  cities = JSON.parse(localStorage.getItem('cities'));
  addSearchItemsToPage(cities);
  console.log('IF!', cities);
} else {
  cities = [];
}