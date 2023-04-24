import { ELEMENTS } from './consts';

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function showModalWindow(text) {
  ELEMENTS.MODAL_WINDOW.style.visibility = 'visible';
  ELEMENTS.MODAL_WINDOW_TEXT.textContent = text;
  ELEMENTS.MODAL_WINDOW_BUTTON.addEventListener('click', () => {
    ELEMENTS.MODAL_WINDOW.style.visibility = 'hidden';
  });
}

export { saveData, getData, showModalWindow };
