import {dateCommentFormat, timeCommentFormat, getRandomDate} from '../utils.js';

const NAMES = [`Jack`, `Marina`, `Martin`, `Kate`];
const EMOJIES = [`smile`, `sleeping`, `puke`, `angry`];
const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra.`;

const generateComment = () => {
  const randomDate = getRandomDate();

  return {
    text: TEXT,
    emotion: EMOJIES[Math.round(Math.random() * (EMOJIES.length - 1))],
    author: NAMES[Math.round(Math.random() * (NAMES.length - 1))],
    date: `${dateCommentFormat(randomDate)} ${timeCommentFormat(randomDate)}`,
  };
};

const generateComments = (count) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }

  return comments;
};

export {generateComments};
