import {MONTH_NAMES, DATE_YEAR, RENDER_METHODS} from './const.js';

import moment from "moment";

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

const yearCardFormat = (date) => {
  const year = moment(date).format(`YYYY`);
  return year;
};

const dateDetailsFormat = (date) => {
  const detailsDate = moment(date).format(`DD MMMM YYYY`);

  return detailsDate;
};

const dateCommentFormat = (date) => {
  const commentDate = moment(date).format(`YYYY/MM/DD HH:mm`);

  return commentDate;
};

const durationFormat = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const durationHours = duration.hours();
  const durationMinutes = duration.minutes();

  return `${durationHours}h ${durationMinutes}m`;
};

const createElement = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;

  return container.firstChild;
};

const render = (target, component, method = RENDER_METHODS.APPEND) => {

  switch (method) {
    case RENDER_METHODS.PREPEND:
      target.prepend(component.getElement());
      break;

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
  dateDetailsFormat,
  durationFormat,
  dateCommentFormat,
  getRandomDate,
  createElement,
  render,
  removeComponent,
  addListeners,
  isEscPress,
  yearCardFormat,
};
