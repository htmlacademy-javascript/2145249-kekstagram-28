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

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function createRandomRepeatNumFromRange(min, max) {
  const previousValues = [];

  return function () {
    const currentValue = getRandomInteger(min, max);
    previousValues.push(currentValue);
    return currentValue;
  };
}

function createCommentId(startNum) {
  let currentId = startNum;
  return function () {
    currentId++;
    return currentId;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, 25);
const generateDescription = createRandomRepeatNumFromRange(0, DESCRIPTION.length - 1);
const generateLikes = createRandomRepeatNumFromRange(15, 200);
const generateCommentId = createCommentId(0);
const generateAvatar = createRandomRepeatNumFromRange(1, 6);
const generateMessage = createRandomRepeatNumFromRange(0, MESSAGE.length - 1);
const generateName = createRandomRepeatNumFromRange(0, NAME.length - 1);

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar${generateAvatar()}.svg`,
  message: MESSAGE[generateMessage()],
  name: NAME[generateName()]
});

const createDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: DESCRIPTION[generateDescription()],
  likes: generateLikes(),
  comments: Array.from({length: getRandomInteger(0, 3)}, createComments)
});

Array.from({length: 25}, createDescription);
