let threeHoursWeatherArray = [];
let fiveDaysWeatherArray = [];
let fiveDaysGeneralTemperature = [];
let weatherDescription = [];
let weatherMainDescription = [];
let datesArray = [];
let descriptionOfDay;
let dataArrayFiveDaysWeather = [];
let toggleTodayCards = true;

function threeHoursWeatherCards(data) {
  const newArray = [...threeHoursWeatherArray].splice(1, 8);
  const cardsThreeHours = newArray.map(createThreeHoursWeatherCards);

  replaceChildren(weatherContainer, cardsThreeHours);
  toggleTodayCards = true;
}

function replaceChildren(parent, children) {
  parent.replaceChildren(...children);
}

// =============== ARRAYS FOR FIVE DAYS CARDS ===============

function filteredData(data) {
  const twentyFourHours  = 24 * 60 * 60 * 1000;
  const todayDate = new Date().getTime();

  dataArrayFiveDaysWeather = [];

  for (let i = 0; i < 5; i++) {
    const dayDate = new Date(todayDate + twentyFourHours * i);
    const day = dayDate.getDate();
    const month = dayDate.getMonth();
    const year = dayDate.getFullYear();
    let fullDayDate;

    if (day < 10) {
      fullDayDate = `${year}-${month + 1}-0${day}`;
    };
  
    if (month < 9) {
      fullDayDate = `${year}-0${month + 1}-${day}`;
    };

    if (day < 10 && month < 9) {
      fullDayDate = `${year}-0${month + 1}-0${day}`;
    };

    if (day >= 10 && month >= 9) {
      fullDayDate = `${year}-${month + 1}-${day}`;
    };

    const oneDayData = data.list.filter((item) => {
      return item.dt_txt.includes(fullDayDate);
    });

    function transformFiveDaysTemperatureArray() {
      fiveDaysGeneralTemperature = [];
      weatherDescription = [];
      weatherMainDescription = [];
      datesArray = [];

      oneDayData.forEach((element) => {
        fiveDaysGeneralTemperature.push(element.main.temp);
        fiveDaysGeneralTemperature.sort((a, b) => {
          return a - b;
        });

        weatherDescription.push(element.weather[0].description);
        weatherMainDescription.push(element.weather[0].main);
        datesArray.push(element.dt_txt
          .split(' ')[0]
          .slice(8));
      });
    }

    transformFiveDaysTemperatureArray();

    function sortWeatherDescriptions(descriptionArray) {
      const resultOfSort = {};
      console.log('weatherMainDescription', descriptionArray)
      descriptionArray.forEach((descr) => {
        resultOfSort[descr] = resultOfSort[descr] + 1 || 1;
      });

      sortingDescriptions = Object.entries(resultOfSort).sort((a, b) => {
        return b[1] - a[1];
      });

      descriptionOfDay = sortingDescriptions[0];

      return descriptionOfDay[0];
    }

    const objectDataOneDaysWeather = {
      date: datesArray[0],
      weather: [
        {
        main: sortWeatherDescriptions(weatherMainDescription),
        description: sortWeatherDescriptions(weatherDescription),
        }
      ],
      max_temp: fiveDaysGeneralTemperature[fiveDaysGeneralTemperature.length - 1],
      min_temp: fiveDaysGeneralTemperature[0],
    }

    dataArrayFiveDaysWeather.push(objectDataOneDaysWeather);
    fiveDaysWeatherCards(dataArrayFiveDaysWeather);
  }
  
  fiveDaysWeatherCards(dataArrayFiveDaysWeather);
}

function fiveDaysWeatherCards(transformedDataArray) {
  const cardsFiveDays = transformedDataArray.map((item) => {
    return createFiveDaysWeatherCards(item);
  });

  replaceChildren(weatherContainer, cardsFiveDays);
  toggleTodayCards = false;
}

function toggleClickStatus() {
  if(toggleTodayCards) {
    todaysWeatherButtonElement.classList.add('clicked-weather-button');
    fiveDaysWeatherButtonElement.classList.remove('clicked-weather-button');
  } else {
    fiveDaysWeatherButtonElement.classList.add('clicked-weather-button');
    todaysWeatherButtonElement.classList.remove('clicked-weather-button');
  }
}
