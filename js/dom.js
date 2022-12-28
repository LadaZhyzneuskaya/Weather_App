const formElement = document.querySelector('form');
const inputElement = document.querySelector('input');
const buttonInputElement = document.querySelector('.container-search__form_button');
const searchContainer = document.querySelector('.container-search');
const searchListElement = document.querySelector('.container-search__results-of-search');
const messageElement = document.querySelector('.container-search__message');

const clearStorageButton = document.querySelector('.container-search__clear-storage-button');

// console.log(hintElement);

const titleCityElement = document.querySelector('.main__title_location');
const dayTodayElement = document.querySelector('.day');
const dateTodayElement = document.querySelector('.date');
const timeElement = document.querySelector('.main__title_time');

const weatherIconNowElement = document.querySelector('.icon');
const temperatureNowElement = document.querySelector('.now_temperature_number');
const feelsLikeNowElement = document.querySelector('.now_feels-like_number');
const descriptionWeatherNowElement = document.querySelector('.now_description_text');

const highTemperatureElement = document.querySelector('.weather-other_temperature_high_number');
const lowTemperatureElement = document.querySelector('.weather-other_temperature_low_number');
const windElement = document.querySelector('.wind_number');
const humidityElement = document.querySelector('.humidity_number');

const todaysWeatherButtonElement = document.querySelector('.main__weather_detailed_titles_today');
const fiveDaysWeatherButtonElement = document.querySelector('.main__weather_detailed_titles_next-days');

const weatherContainer = document.querySelector('.hourly');
// const threeHoursWeatherIcon = document.querySelectorAll('.hourly_item_icon');

// const fiveDaysWeatherContainer = document.querySelector('.main__weather_detailed_forecast_five-days');
// const fiveDaysWeatherIcon = document.querySelectorAll('.five-days_icon');

// console.log();



function createCard({
  tag,
  classList,
  attributes,
  textContent,
  children,
  childrenAction,
}) {
  const element = document.createElement(tag);
  // console.log(element)

  if (classList?.length) {
    element.classList.add(...classList);
  }

  if (attributes?.length) {
    attributes.forEach(({ prop, value }) => {
      element.setAttribute(prop, value);
    });
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (children) {
    element[childrenAction](...children);
  }

  return element; 
}

// =============== Create three hours weather cards ===============

// data = data.list!!!
function createThreeHoursWeatherCards(data) {
  const timeItem = createCard({
    tag: 'p',
    classList: ['hourly_item_time'],
    textContent: data.dt_txt
      .split(' ')[1]
      .slice(0, 5),
  });

  const imageItem = createCard({
    tag: 'img',
    classList: ['hourly_item_icon'],
    attributes: [{prop: 'src', value: getCardsIcon(data)}, {prop: 'alt', value: 'weather-icon'}],
  });

  const temperatureItem = createCard({
    tag: 'p',
    classList: ['hourly_item_temperature_number'],
    textContent: `${Math.round(data.main.temp).toString()}°`,
  });

  const cardContainer = createCard({
    tag: 'div',
    classList: ['hourly_item'],
    children: [timeItem, imageItem, temperatureItem],
    childrenAction: 'append',
  });

  return cardContainer;
};

// =============== Create five days weather cards ===============

function createFiveDaysWeatherCards(data) {
  function getDay(data) {
    for (let i = 0; i < data.length; i = i + 8) {
      return data.list[i].dt_txt;
    }
  }

  const dateItem = createCard({
    tag: 'p',
    classList: ['five-days_date'],
    textContent: data.dt_txt
      .split(' ')[0]
      .slice(8, 11),
  });

  const dayItem = createCard({
    tag: 'p',
    classList: ['five-days_day'],
    textContent: getDay(data),
  });

  const imageItem = createCard({
    tag: 'img',
    classList: ['five-days_icon'],
    attributes: [{prop: 'src', value: getCardsIcon(data)}, {prop: 'alt', value: 'weather-icon'}],
  });

  const dayTemperatureItem = createCard({
    tag: 'p',
    classList: ['five-days_day-temperature'],
    textContent: `${Math.round(data.main.temp_max).toString()}°`,
  });

  const nightTemperatureItem = createCard({
    tag: 'p',
    classList: ['five-days_night-temperature'],
    textContent: `${Math.round(data.main.temp_min).toString()}°`,
  });

  const cardContainer = createCard({
    tag: 'div',
    classList: ['five-days'],
    children: [dateItem, dayItem, imageItem, dayTemperatureItem, nightTemperatureItem],
    childrenAction: 'append',
  });

  return cardContainer;
}

// =============== Create search items ===============

function createSearchItems(cityName) {
  const searchItem = createCard({
    tag: 'p',
    classList: ['item_location'],
    textContent: cityName,
  });

  const closeButtonImage =createCard({
    tag: 'p',
    classList: ['item_close-button_icon'],
    // attributes: [{prop: 'src', value: '/icons/close-button.png'}, {prop: 'alt', value: 'close-icon'}],
    textContent: '✖',
  });

  const closeButtonContainer = createCard({
    tag: 'button',
    classList: ['item_close-button'],
    // textContent: '✖',
    attributes: [{prop: 'type', value: 'button'}],
    children: [closeButtonImage],
    childrenAction: 'append',
  });

  const itemsContainer = createCard({
    tag: 'li',
    classList: ['container-search__results-of-search_item', 'item'],
    attributes: [{prop: 'data-name', value: `${cityName}`}],
    children: [searchItem, closeButtonContainer],
    childrenAction: 'append',
  });

  return itemsContainer;
}