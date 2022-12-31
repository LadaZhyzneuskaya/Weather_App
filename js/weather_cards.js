let threeHoursWeatherArray = [];
let fiveDaysWeatherArray = [];
let fiveDaysGeneralTemperature = [];
let weatherDescription = [];
let weatherMainDescription = [];
let datesArray = [];
let descriptionOfDay;
let dataArrayFiveDaysWeather = [];
// let fiveDaysNightTemperature = [];

function threeHoursWeatherCards(data) {
  const newArray = [...threeHoursWeatherArray].splice(0, 10);
  // threeHoursWeatherArray.length = 10;
  const cardsThreeHours = newArray.map(createThreeHoursWeatherCards);
  // console.log(newArray);
  replaceChildren(weatherContainer, cardsThreeHours);
}

// function fiveDaysWeatherCards(data) {
//   const newArray = fiveDaysWeatherArray.filter((item) => {
//     return item.dt_txt
//       .split(' ')[1]
//       .slice(0, 5) === '15:00';
//     // item.dt_txt === "2022-12-24 21:00:00";
//     // console.log(item.dt_txt === "2022-12-24 21:00:00")
//   });

//   const cardsFiveDays = newArray.map(createFiveDaysWeatherCards);
//   console.log('newArray', newArray);
//   replaceChildren(weatherContainer, cardsFiveDays);

//   return newArray;

//   // fiveDaysGeneralTemperature = fiveDaysWeatherArray.filter((item) => {
//   //   const temperatureArray = d
//   //   fiveDaysGeneralTemperature.push(temperatureArray);
//   // });
// }

function replaceChildren(parent, children) {
  parent.replaceChildren(...children);
}

// filteredData(data)!!! ============================================================================
function addCardsToPage(data) {
  // filteredData(data);
  // // fiveDaysWeatherCards(data);
  threeHoursWeatherCards(data);

  todaysWeatherButtonElement.addEventListener('click', () => {
    threeHoursWeatherCards();
  });
  
  fiveDaysWeatherButtonElement.addEventListener('click', () => {
    filteredData(data);
  });
}

// =============== BUTTONS FOR CARDS ===============

// todaysWeatherButtonElement.addEventListener('click', () => {
//   threeHoursWeatherCards();
// });

// fiveDaysWeatherButtonElement.addEventListener('click', () => {
//   fiveDaysWeatherCards();
// });

// =============== ARRAYS FOR FIV DAYS CARDS ===============

// data === data.list!!! 
function filteredData(data) {
  const twentyFourHours  = 24 * 60 * 60 * 1000;
  const todayDate = new Date().getTime();
  // console.log('oneDayData', todayDate);
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

    // console.log('fullDayDate', fullDayDate);

    const oneDayData = data.list.filter((item) => {
      return item.dt_txt.includes(fullDayDate);
    });
    // console.log('oneDayData', oneDayData);


    function transformFiveDaysTemperatureArray() {
      // console.log('F oneDayData', oneDayData);

      fiveDaysGeneralTemperature = [];
      weatherDescription = [];
      weatherMainDescription = [];
      datesArray = [];

      oneDayData.forEach((element) => {
        // console.log('element', element);
        fiveDaysGeneralTemperature.push(element.main.temp);
        fiveDaysGeneralTemperature.sort((a, b) => {
          return a - b;
        });

        weatherDescription.push(element.weather[0].description);
        weatherMainDescription.push(element.weather[0].main);
        datesArray.push(element.dt_txt
          .split(' ')[0]
          .slice(8));

        // console.log('fiveDaysGeneralTemperature', fiveDaysGeneralTemperature);
        console.log('weatherDescription', weatherDescription);
        console.log('weatherMainDescription', weatherMainDescription);
      });
    }
    transformFiveDaysTemperatureArray();

    function sortWeatherDescriptions(descriptionArray) {
      const resultOfSort = {};
      console.log('weatherMainDescription', descriptionArray)
      descriptionArray.forEach((descr) => {
        // console.log('elem-weatherDescription', descr);

        resultOfSort[descr] = resultOfSort[descr] + 1 || 1;
        // console.log('resultOfSort', resultOfSort);
      });
      // console.log('resultOfWeatherDescription', resultOfWeatherDescription);

      sortingDescriptions = Object.entries(resultOfSort).sort((a, b) => {
        return b[1] - a[1];
      });

      descriptionOfDay = sortingDescriptions[0];
      // console.log('sortingDescriptions', sortingDescriptions);
      // console.log('descriptionOfDay', descriptionOfDay[0]);
      return descriptionOfDay[0];
    }


    // function sortWeatherMainDescriptions() {
    //   const resultOfMainSort = {};
    //   console.log('weatherMainDescription', weatherMainDescription)
    //   weatherMainDescription.forEach((descr) => {
    //     // console.log('elem-weatherDescription', descr);

    //     resultOfMainSort[descr] = resultOfMainSort[descr] + 1 || 1;
    //     // console.log('resultOfSort', resultOfSort);
    //   });
    //   // console.log('resultOfWeatherDescription', resultOfWeatherDescription);

    //   sortingDescriptions = Object.entries(resultOfMainSort).sort((a, b) => {
    //     return b[1] - a[1];
    //   });

    //   descriptionOfDay = sortingDescriptions[0];
    //   // console.log('sortingDescriptions', sortingDescriptions);
    //   // console.log('descriptionOfDay', descriptionOfDay[0]);
    //   return descriptionOfDay[0];
    // }
    // // sortWeatherDescriptions();

    const objectDataOneDaysWeather = {
      date: datesArray[0],
      weather: [{
        main: sortWeatherDescriptions(weatherMainDescription),
        description: sortWeatherDescriptions(weatherDescription),
      }],
      max_temp: fiveDaysGeneralTemperature[fiveDaysGeneralTemperature.length - 1],
      min_temp: fiveDaysGeneralTemperature[0],
    }

    dataArrayFiveDaysWeather.push(objectDataOneDaysWeather);
    fiveDaysWeatherCards(dataArrayFiveDaysWeather);
    // console.log(fiveDaysGeneralTemperature);
    // console.log(weatherMainDescription);
    // console.log(datesArray);
    // console.log(descriptionOfDay);
  }

  console.log('dataArrayFiveDaysWeather', dataArrayFiveDaysWeather[3]);
  
  fiveDaysWeatherCards(dataArrayFiveDaysWeather);
}

function fiveDaysWeatherCards(transformedDataArray) {
  console.log('item', transformedDataArray);
  const cardsFiveDays = transformedDataArray.map((item) => {
    // console.log('item', item);
    return createFiveDaysWeatherCards(item);
  });
  console.log('cardsFiveDays', cardsFiveDays);
  replaceChildren(weatherContainer, cardsFiveDays);
}
