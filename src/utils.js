import {MONTH_NAMES, DATE_YEAR, RENDER_METHODS} from './const.js';

const DAYS = 31;
const HOURS = 24;
const MINUTES = 60;
const PRESS_KEY = {
  ESC: 27,
};

const isEscPress = (evt) => evt.keyCode === PRESS_KEY.ESC;

const getRandomArray = (arr) => {
  const count = Math.round(Math.random() * (arr.length - 1)) + 1;
  const newArr = [];

  for (let i = 0; i < count; i++) {
    newArr.push(arr[i]);
  }

  return newArr;
};

const getRandomInteger = (min, max) => {
  return Math.round(min + (Math.random() * (max - min)));
};

const getRandomDate = () => {
  const date = new Date(
      getRandomInteger(DATE_YEAR.min, DATE_YEAR.max),
      getRandomInteger(0, MONTH_NAMES.length),
      getRandomInteger(0, DAYS),
      getRandomInteger(0, HOURS),
      getRandomInteger(0, MINUTES)
  );

  return date;
};

const dateCardFormat = (date) => {
  const day = String(date.getDate()).padStart(2, 0);
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const dateCommentFormat = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDate()).padStart(2, 0);

  return `${year}/${month}/${day}`;
};

const timeCardFormat = (minutes) => {
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return `${hours}h ${minutes}m`;
};

const timeCommentFormat = (date) => {
  const hours = String(date.getHours()).padStart(2, 0);
  const minutes = String(date.getMinutes()).padStart(2, 0);
  return `${hours}:${minutes}`;
};

const createElement = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;

  return container.firstChild;
};

const render = (target, component, method = RENDER_METHODS.APPEND) => {

  switch (method) {
    case RENDER_METHODS.APPEND:
      target.append(component.getElement());
      break;
    case RENDER_METHODS.AFTER:
      target.after(component.getElement());
      break;
  }
};

const removeComponent = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const addListeners = (cb, ...controls) => {
  controls.forEach((control) => control.addEventListener(`click`, cb));
};

export {
  getRandomArray,
  getRandomInteger,
  dateCardFormat,
  timeCardFormat,
  dateCommentFormat,
  timeCommentFormat,
  getRandomDate,
  createElement,
  render,
  removeComponent,
  addListeners,
  isEscPress,
};
