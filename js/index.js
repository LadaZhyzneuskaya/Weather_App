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

toggleClearStorageButtonStatus();

// ================ SEARCH ================

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputValue = inputElement.value;
  getData(inputValue);

  checkItem(inputValue);
  toggleClearStorageButtonStatus();

  toggleTodayCards = true;
  toggleClickStatus();
  
  console.log('formElement', searchArray);

  inputElement.value = '';
});

function getLocation(data) {
  const location = data.city.name;
  titleCityElement.textContent = location;
}

function gettemperatureToday(data) {
  const temperature = Math.round(data.list[0].main.temp);
  temperatureNowElement.textContent = temperature;
}

function getfeelsLikeTemperature(data) {
  const feelsLike = Math.round(data.list[0].main.feels_like);
  feelsLikeNowElement.textContent = feelsLike;
}

function getweatherDescription(data) {
  const description = data.list[0].weather[0].description;
  const convertDescription = convertFirstLetter(description);
  descriptionWeatherNowElement.textContent = convertDescription;
}

function convertFirstLetter(description) {
  const letterArray = description.split('');
  const firstLetter = letterArray[0].toUpperCase();
  const copyLetterArray = [...letterArray];
  copyLetterArray.splice(0, 1);
  const result = [firstLetter, ...copyLetterArray].join('');
  
  return result;
}

function getHighTemperature(data) {
  const highTemperature = Math.round(data.list[0].main.temp_max);
  highTemperatureElement.textContent = highTemperature;
}

function getLowTemperature(data) {
  const lowTemperature = Math.round(data.list[0].main.temp_min);
  lowTemperatureElement.textContent = lowTemperature;
}

function getWind(data) {
  const wind = Math.round(data.list[0].wind.speed);
  windElement.textContent = wind;
}

function getHumidity(data) {
  const humidity =  data.list[0].main.humidity;
  humidityElement.textContent = humidity;
}

// element = weatherIconNowElement
function getIcon(data, element) {
  switch (data.weather[0].main) {
    case 'Clear':
      return element.src = '/icons/day_clear.png';
    
    case 'Snow':
      return element.src = '/icons/snow.png';

    case 'Mist':
      return element.src = '/icons/mist.png';

    case 'Thunderstorm':
      return element.src = '/icons/thunderstorm.png';

    case 'Rain':
      if (data.weather[0].description === 'light rain') {
        return element.src = '/icons/light_rain.png';
      } else {
        return element.src = '/icons/moderate_rain.png';
      }

    case 'Clouds':
      if (data.weather[0].description === 'overcast clouds') {
        return element.src = '/icons/overcast_clouds.png';
      } else {
        return element.src = '/icons/day_few_clouds.png';
      }

    default:
      element.src = '/icons/unknown.png';
  }
}

function getCardsIcon(data) {
  console.log('ICONS data', data)
  switch (data.weather[0].main) {
    case 'Clear':
      return '/icons/day_clear.png';

    
    case 'Snow':
      return '/icons/snow.png';

    case 'Mist':
      return '/icons/mist.png';

    case 'Thunderstorm':
      return '/icons/thunderstorm.png';

    case 'Rain':
      if (data.weather[0].description === 'light rain') {
        return '/icons/light_rain.png';
      } else {
        return '/icons/moderate_rain.png';
      }

    case 'Clouds':
      if (data.weather[0].description === 'overcast clouds') {
        return '/icons/overcast_clouds.png';
      } else {
        return '/icons/day_few_clouds.png';
      }

    default:
      '/icons/unknown.png';
  }
}
