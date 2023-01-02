let invalidCityNames = [];


async function getData(inputValue = 'Minsk') {
  try {
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&appid={API-key}`);  // API-key

    const data = await response.json();
    // console.log('DATA', data);

    if (response.status !== 200) {
      showMessage();
    } else {
      messageElement.classList.add('container-search__message--turn-opacity');
    }

    showMainPageWeather(data);
    
  } catch (error) {
    console.log(error);

    return;
  }
}

