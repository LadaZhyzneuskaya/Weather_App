const showMainPageWeather = (data) => {
  threeHoursWeatherArray = data.list;
  fiveDaysWeatherArray = data.list;
  
  addElementsToPage(data);

  addCardsToPage();
}

function getTime() {
  setInterval(() => {
    const date = new Date();
    // const UTC_TIME = date.getUTCHours();

    // const hours = UTC_TIME - Number(`${dataTime}`);
    // console.log(hours);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (hours < 10) {
      timeElement.textContent = `0${hours}:${minutes}:${seconds}`;
    };

    if (minutes < 10) {
      timeElement.textContent = `${hours}:0${minutes}:${seconds}`;
    };

    if (seconds < 10) {
      timeElement.textContent = `${hours}:${minutes}:0${seconds}`;
    };

    if (hours >= 10 && minutes >= 10 && seconds >= 10) {
      timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    };
  }, 500);

  // const date = new Date();
  // const UTC_TIME = date.getUTCHours();
  // const cityTime = UTC_TIME
  // // CITYTIME.toISOString();
  // console.log(UTC_TIME);
  // timeElement.textContent = `0${hours}:${minutes}:${seconds}`;
}

function getDateToday() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const formattedDate = `${day}.${month + 1}.${year}`;
  dateTodayElement.textContent = formattedDate;
}

function getDayToday() {
  const date = new Date();
  const day = date.getDay();

  switch (day) {
    case 0:
      dayTodayElement.textContent = 'Sunday';
      break;

    case 1:
      dayTodayElement.textContent = 'Monday';
      break;

    case 2:
      dayTodayElement.textContent = 'Tuesday';
      break;

    case 3:
      dayTodayElement.textContent = 'Wednesday';
      break;

    case 4:
      dayTodayElement.textContent = 'Thursday';
      break;

    case 5:
      dayTodayElement.textContent = 'Friday';
      break;

    case 6:
      dayTodayElement.textContent = 'Saturday';
      break;
  }
}


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
        console.log('HI!!!', element.src = '/icons/day_few_clouds.png')
        return element.src = '/icons/day_few_clouds.png';
      }

    default:
      element.src = '/icons/unknown.png';
  }
}
