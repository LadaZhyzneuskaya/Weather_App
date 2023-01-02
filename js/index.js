const showApplication = () => {
  getData();
}
showApplication();

function addElementsToPage (data) {
  getTime();
  getDateToday();
  getDayToday();
  getLocation(data);
  gettemperatureToday(data);
  getfeelsLikeTemperature(data);
  getweatherDescription(data);
  getHighTemperature(data);
  getLowTemperature(data);
  getWind(data);
  getHumidity(data);
  getIcon(data.list[0], weatherIconNowElement);
};

function addCardsToPage(data) {
  threeHoursWeatherCards(data);

  todaysWeatherButtonElement.addEventListener('click', () => {
    threeHoursWeatherCards();
    toggleClickStatus();
  });
  
  fiveDaysWeatherButtonElement.addEventListener('click', () => {
    filteredData(data);
    toggleClickStatus();
  });
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputValue = inputElement.value;
  getData(inputValue);

  checkItem(inputValue);
  toggleClearStorageButtonStatus();

  toggleTodayCards = true;
  toggleClickStatus();

  inputElement.value = '';
});

toggleClearStorageButtonStatus();
