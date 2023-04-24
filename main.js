import { format } from 'date-fns';
import removeIcon from './img/delete-icon.svg';

import { getData, saveData } from './view';
import {
  VALUES, ELEMENTS, TAB_NOW, TAB_DETAILS, TAB_FORECAST, SERVER,
} from './consts';

async function serverRequest(serverUrl, cityName) {
  try {
    const URL = `${serverUrl}?q=${cityName}&appid=${SERVER.API_KEY}&units=metric`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`data is not found, ${response.status}`);
    }
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
}

async function getCityForecast(cityName) {
  try {
    const weatherData = await serverRequest(SERVER.FORECAST, cityName);
    const forecastList = await weatherData.list.slice(0, 4);

    VALUES.FORECAST.forEach((number) => {
      TAB_FORECAST.HEADER.textContent = weatherData.city.name;
      TAB_FORECAST.DATE[number].textContent = format(
        new Date(forecastList[number].dt_txt),
        'd LLL',
      );
      TAB_FORECAST.TIME[number].textContent = format(
        new Date(forecastList[number].dt * 1000),
        'HH:mm',
      );
      TAB_FORECAST.TEMPERATURE[number].textContent = `${
        VALUES.TEMPERATURE
      }: ${Math.round(forecastList[number].main.temp)}${VALUES.DEGREE}`;
      TAB_FORECAST.FEELING[number].textContent = `${
        VALUES.FEELING
      }: ${Math.round(forecastList[number].main.feels_like)}${VALUES.DEGREE}`;
      TAB_FORECAST.CAPTION[
        number
      ].textContent = `${forecastList[number].weather[0].main}`;
      TAB_FORECAST.ICON[
        number
      ].src = `http://openweathermap.org/img/wn/${forecastList[number].weather[0].icon}@4x.png`;

      number += 1;
    });
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
}

async function getCityNow(cityName) {
  try {
    const weatherData = await serverRequest(SERVER.SERVER_URL, cityName);

    TAB_NOW.NAME.textContent = weatherData.name;
    TAB_NOW.TEMPERATURE.textContent = Math.round(weatherData.main.temp) + VALUES.DEGREE;
    TAB_NOW.ICON.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

    TAB_DETAILS.HEADER.textContent = weatherData.name;
    TAB_DETAILS.TEMPERATURE.textContent = `${VALUES.TEMPERATURE}: ${Math.round(
      weatherData.main.temp,
    )}${VALUES.DEGREE}`;
    TAB_DETAILS.FEELING.textContent = `${VALUES.FEELING}: ${Math.round(
      weatherData.main.feels_like,
    )}${VALUES.DEGREE}`;
    TAB_DETAILS.WEATHER.textContent = `${VALUES.WEATHER}: ${weatherData.weather[0].main}`;
    TAB_DETAILS.SUNRISE.textContent = `${VALUES.SUNRISE}: ${format(
      new Date(weatherData.sys.sunrise * 1000),
      'HH:mm',
    )}`;
    TAB_DETAILS.SUNSET.textContent = `${VALUES.SUNSET}: ${format(
      new Date(weatherData.sys.sunset * 1000),
      'HH:mm',
    )}`;
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }

  getCityForecast(cityName);
}

function addCityListLocations(cityName) {
  const citiesList = getData(VALUES.CITIES_LIST) || VALUES.LIST;
  if (!citiesList.includes(cityName)) {
    const newCitiesList = [...citiesList, cityName];
    saveData(VALUES.CITIES_LIST, newCitiesList);
    render([cityName]);
    TAB_NOW.FAVORITES.classList.add('like');
  }
}

function deleteCityListLocations(cityName) {
  const citiesList = getData(VALUES.CITIES_LIST) || VALUES.LIST;
  const newCitiesList = citiesList.filter((city) => city !== cityName);
  saveData(VALUES.CITIES_LIST, newCitiesList);
}

function saveCurrentCity(cityName) {
  saveData(VALUES.CURRENT_CITY, cityName);
  getCityNow(cityName);
}

function getCurrentCity() {
  const currentCity = getData(VALUES.CURRENT_CITY);
  const citiesList = getData(VALUES.CITIES_LIST);
  saveCurrentCity(currentCity);
  if (citiesList.includes(currentCity)) {
    TAB_NOW.FAVORITES.classList.add('like');
  }
}

function render(list) {
  ELEMENTS.LOCATIONS_LIST.forEach((item) => item.remove());

  return list.forEach((item) => {
    const cityWrap = document.createElement('div');
    cityWrap.className = 'city__name-wrap';
    ELEMENTS.ADDED_CITIES.prepend(cityWrap);

    const newCity = document.createElement('p');
    newCity.className = 'city__name';
    newCity.textContent = item;
    cityWrap.prepend(newCity);

    newCity.addEventListener('click', () => {
      saveCurrentCity(item);
      TAB_NOW.FAVORITES.classList.add('like');
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete__button';
    cityWrap.append(deleteButton);

    const deleteIcon = document.createElement('img');
    deleteIcon.src = removeIcon;
    deleteIcon.alt = 'Delete';
    deleteButton.prepend(deleteIcon);

    deleteButton.addEventListener('click', () => {
      cityWrap.remove();
      deleteCityListLocations(cityWrap.textContent);
      if (cityWrap.textContent === TAB_NOW.NAME.textContent) {
        TAB_NOW.FAVORITES.classList.remove('like');
      }
    });
  });
}

ELEMENTS.BODY.addEventListener('DOMContentLoaded', () => {
  window.location.href = '#now';
  const citiesList = getData(VALUES.CITIES_LIST);
  render(citiesList);
  getCurrentCity();
});

ELEMENTS.FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  if (ELEMENTS.INPUT.value.trim() && isNaN(ELEMENTS.INPUT.value)) {
    getCityNow(ELEMENTS.INPUT.value.trim());
    TAB_NOW.FAVORITES.classList.remove('like');
  }
});

TAB_NOW.FAVORITES.addEventListener('click', () => {
  addCityListLocations(TAB_NOW.NAME.textContent);
});

TAB_NOW.BUTTON.forEach((button) => {
  button.addEventListener('click', () => {
    TAB_NOW.BUTTON.forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  });
});

TAB_NOW.LINK.forEach((link) => {
  link.addEventListener('click', () => {
    TAB_NOW.LINK.forEach((item) => {
      item.classList.remove('link');
    });
    link.classList.add('link');
  });
});
