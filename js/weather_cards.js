let threeHoursWeatherArray = [];
let fiveDaysWeatherArray = [];

function threeHoursWeatherCards() {
  const newArray = [...threeHoursWeatherArray].splice(0, 10);
  // threeHoursWeatherArray.length = 10;
  const cardsThreeHours = newArray.map(createThreeHoursWeatherCards);
  console.log(newArray);
  replaceChildren(weatherContainer, cardsThreeHours);
}

function fiveDaysWeatherCards() {
  const newArray = fiveDaysWeatherArray.filter((item) => {
    return item.dt_txt
      .split(' ')[1]
      .slice(0, 5) === '15:00';
    // item.dt_txt === "2022-12-24 21:00:00";
    // console.log(item.dt_txt === "2022-12-24 21:00:00")
  });

  const cardsFiveDays = newArray.map(createFiveDaysWeatherCards);
  console.log(fiveDaysWeatherArray);
  replaceChildren(weatherContainer, cardsFiveDays);

  return newArray;
  // for (let i = 1; i < fiveDaysWeatherArray.length; i = i + 8) {
  //   // cardsFiveDays = fiveDaysWeatherArray.map(createFiveDaysWeatherCards);
  //   cardsFiveDays = fiveDaysWeatherArray.map((element) => {

  //   });
  // }
  // replaceChildren(fiveDaysWeatherContainer, cardsFiveDays);
}

function replaceChildren(parent, children) {
  parent.replaceChildren(...children);
}

function addCardsToPage() {
  // fiveDaysWeatherCards();
  threeHoursWeatherCards();
}

// =============== BUTTONS FOR CARDS ===============

todaysWeatherButtonElement.addEventListener('click', () => {
  threeHoursWeatherCards();
});

fiveDaysWeatherButtonElement.addEventListener('click', () => {
  fiveDaysWeatherCards();
});
