import { getRandomInteger, createRandomIdFromRangeGenerator, createCommentId } from './util.js';

const PHOTO_COUNT = 25;

const AVATAR_COUNT = 6;

const DESCRIPTION = [
  'Это был хороший день!',
  'Простое описание',
  'Описание из четырех слов',
  'Опиши фото в трёх словах',
  'Сочетание цветов и форм завораживает'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME = [
  'Артём',
  'Борис',
  'Владимир',
  'Геннадий',
  'Дмитрий',
  'Евгений',
  'Жанна'
];

const generatePhotoId = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);
const generateCommentId = createCommentId(0);

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: MESSAGE[getRandomInteger(0, MESSAGE.length - 1)],
  name: NAME[getRandomInteger(0, NAME.length - 1)]
});

const createDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 3)}, createComments)
});

const createDescriptions = () => Array.from({length: 25}, createDescription);
export {createDescriptions};
