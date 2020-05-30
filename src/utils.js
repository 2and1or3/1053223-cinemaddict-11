import {RenderMethods, USER_STATUSES} from './const.js';

import moment from "moment";

const PRESS_KEY = {
  ESC: 27,
};

const isEscPress = (evt) => evt.keyCode === PRESS_KEY.ESC;

const getRandomInteger = (min, max) => {
  return Math.round(min + (Math.random() * (max - min)));
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
  const commentDate = moment(date).fromNow();

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

const render = (target, component, method = RenderMethods.APPEND) => {

  switch (method) {
    case RenderMethods.PREPEND:
      target.prepend(component.getElement());
      break;

    case RenderMethods.APPEND:
      target.append(component.getElement());
      break;

    case RenderMethods.AFTER:
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

const getUserStatus = (watchedQuantity) => {
  const userStatus = USER_STATUSES.find((status) => watchedQuantity >= status.minStatusEdge);

  return userStatus.title;
};

const parsePrefixId = (prefix, id) => id.slice(prefix.length);

const replace = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;

  const isExistElements = !!(newElement && oldElement && parentElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {
  getRandomInteger,
  dateDetailsFormat,
  durationFormat,
  dateCommentFormat,
  createElement,
  render,
  removeComponent,
  addListeners,
  isEscPress,
  yearCardFormat,
  getUserStatus,
  parsePrefixId,
  replace
};
