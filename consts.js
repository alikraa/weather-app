const VALUES = {
  DEGREE: '°',
  TEMPERATURE: 'Temperature',
  FEELING: 'Feels like',
  WEATHER: 'Weather',
  SUNRISE: 'Sunrise',
  SUNSET: 'Sunset',
  FORECAST: [0, 1, 2, 3],
  CITIES_LIST: 'citiesList',
  CURRENT_CITY: 'currentCity',
  LIST: [],
};

const ELEMENTS = {
  FORM: document.querySelector('.search__city'),
  INPUT: document.querySelector('.searching'),
  ADDED_CITIES: document.querySelector('.cities'),
  LOCATIONS_CITIES_NAME: document.querySelector('.city__name'),
  LOCATIONS_LIST: document.querySelectorAll('.city__name-wrap'),
  BODY: document,
};

const TAB_NOW = {
  TEMPERATURE: document.querySelector('.temperature'),
  NAME: document.querySelector('.name'),
  ICON: document.querySelector('.cloud'),
  FAVORITES: document.querySelector('svg'),
  BUTTON: document.querySelectorAll('.tab'),
  LINK: document.querySelectorAll('a'),
};

const TAB_DETAILS = {
  HEADER: document.querySelector('.header__city'),
  TEMPERATURE: document.querySelector('.temper'),
  FEELING: document.querySelector('.feeling'),
  WEATHER: document.querySelector('.weather'),
  SUNRISE: document.querySelector('.sunrise'),
  SUNSET: document.querySelector('.sunset'),
};

const TAB_FORECAST = {
  HEADER: document.querySelector('.header__city-forecast'),
  DATE: document.querySelectorAll('.date'),
  TIME: document.querySelectorAll('.time'),
  TEMPERATURE: document.querySelectorAll('.now-temp'),
  FEELING: document.querySelectorAll('.feeling-temp'),
  CAPTION: document.querySelectorAll('.icon__caption'),
  ICON: document.querySelectorAll('.weather__icon'),
};

const SERVER = {
  SERVER_URL: 'http://api.openweathermap.org/data/2.5/weather',
  FORECAST: 'http://api.openweathermap.org/data/2.5/forecast',
  API_KEY: '3a93792a7ff7223513e2ff98278e394d',
};

export {
  VALUES, ELEMENTS, TAB_NOW, TAB_DETAILS, TAB_FORECAST, SERVER,
};
