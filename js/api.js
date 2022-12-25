async function getData(inputValue = 'Minsk') {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&appid=b239018cddb9ecc8b2a5de48c505d483`);

    const data = await response.json();
    console.log('DATA', data);

    showMainPageWeather(data);
    
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentTime(inputValue = 'Minsk') {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=b239018cddb9ecc8b2a5de48c505d483`);

    const data = await response.json();
    console.log('CURRENT_TIME', data);
    // getTime(data.timezone);
    // addCurrentElementsToPage(data);
    
  } catch (error) {
    // console.log(error);
  }
};
// getCurrentTime();