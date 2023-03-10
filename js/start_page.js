const showMainPageWeather = (data) => {
  threeHoursWeatherArray = data.list;
  fiveDaysWeatherArray = data.list;
  
  addElementsToPage(data);

  addCardsToPage(data);
}

function getTime() {
  setInterval(() => {
    const date = new Date();
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
}

function getDateToday() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  if (day < 10) {
    dateTodayElement.textContent = `0${day}.${month + 1}.${year}`;
  };

  if (month < 9) {
    dateTodayElement.textContent = `${day}.0${month + 1}.${year}`;
  };

  if (day < 10 && month < 9) {
    fullDayDate = `0${day}.0${month + 1}.${year}`;
  };

  if (day >= 10 && month >= 10) {
    dateTodayElement.textContent = `${day}.${month + 1}.${year}`;
  };
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

function getIcon(data, element) {
  switch (data.weather[0].main) {
    case 'Clear':
      wrapperElement.classList.add('sun-theme');
      wrapperElement.classList.remove('snow-theme');
      wrapperElement.classList.remove('mist-theme');
      wrapperElement.classList.remove('thunderstorm-theme');
      wrapperElement.classList.remove('rain_theme');
      wrapperElement.classList.remove('overcast-cloud-theme');
      wrapperElement.classList.remove('few-cloud-theme');

      return element.src = '/icons/day_clear.png';
    
    case 'Snow':
      wrapperElement.classList.add('snow-theme');
      wrapperElement.classList.remove('sun-theme');
      wrapperElement.classList.remove('mist-theme');
      wrapperElement.classList.remove('thunderstorm-theme');
      wrapperElement.classList.remove('rain_theme');
      wrapperElement.classList.remove('overcast-cloud-theme');
      wrapperElement.classList.remove('few-cloud-theme');
      return element.src = '/icons/snow.png';

    case 'Mist':
      wrapperElement.classList.add('mist-theme');
      wrapperElement.classList.remove('sun-theme');
      wrapperElement.classList.remove('snow-theme');
      wrapperElement.classList.remove('thunderstorm-theme');
      wrapperElement.classList.remove('rain_theme');
      wrapperElement.classList.remove('overcast-cloud-theme');
      wrapperElement.classList.remove('few-cloud-theme');
      return element.src = '/icons/mist.png';

    case 'Thunderstorm':
      wrapperElement.classList.add('thunderstorm-theme');
      wrapperElement.classList.remove('sun-theme');
      wrapperElement.classList.remove('snow-theme');
      wrapperElement.classList.remove('mist-theme');
      wrapperElement.classList.remove('rain_theme');
      wrapperElement.classList.remove('overcast-cloud-theme');
      wrapperElement.classList.remove('few-cloud-theme');
      return element.src = '/icons/thunderstorm.png';

    case 'Rain':
      wrapperElement.classList.add('rain_theme');
      wrapperElement.classList.remove('sun-theme');
      wrapperElement.classList.remove('snow-theme');
      wrapperElement.classList.remove('mist-theme');
      wrapperElement.classList.remove('thunderstorm-theme');
      wrapperElement.classList.remove('overcast-cloud-theme');
      wrapperElement.classList.remove('few-cloud-theme');

      if (data.weather[0].description === 'light rain') {
        return element.src = '/icons/light_rain.png';
      } else {
        return element.src = '/icons/moderate_rain.png';
      }

    case 'Clouds':
      if (data.weather[0].description === 'overcast clouds') {
        wrapperElement.classList.add('overcast-cloud-theme');
        wrapperElement.classList.remove('sun-theme');
        wrapperElement.classList.remove('snow-theme');
        wrapperElement.classList.remove('mist-theme');
        wrapperElement.classList.remove('thunderstorm-theme');
        wrapperElement.classList.remove('rain_theme');
        wrapperElement.classList.remove('few-cloud-theme');
        return element.src = '/icons/overcast_clouds.png';
      } else {
        wrapperElement.classList.add('few-cloud-theme');
        wrapperElement.classList.remove('sun-theme');
        wrapperElement.classList.remove('snow-theme');
        wrapperElement.classList.remove('mist-theme');
        wrapperElement.classList.remove('thunderstorm-theme');
        wrapperElement.classList.remove('rain_theme');
        wrapperElement.classList.remove('overcast-cloud-theme');
        return element.src = '/icons/day_few_clouds.png';
      }

    default:
      element.src = '/icons/unknown.png';
  }
}

function getCardsIcon(data) {
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
