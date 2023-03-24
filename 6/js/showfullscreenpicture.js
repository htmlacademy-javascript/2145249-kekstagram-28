import { isEscapeKey, isEnterKey } from './util.js';
import { usersPictures } from './create-thumbnails.js';

import {renderFullPicture, clearFullPicture} from './createfullscreenpicture.js';

const allPictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closePicture = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
};

function openFullPicture (evt) {

  if(evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');
    const target = evt.target.closest('.picture');
    const pictureData = usersPictures.find((photoData) => photoData.id === Number(target.dataset.index));
    renderFullPicture(pictureData);
    document.body.classList.add('modal-open');
  }
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFullPicture () {
  bigPicture.classList.add('hidden');
  clearFullPicture();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

allPictures.addEventListener('click', (evt) => {
  openFullPicture(evt);
});

allPictures.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openFullPicture(evt);
  }
});

closePicture.addEventListener('click', () => {
  closeFullPicture();
});

closePicture.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeFullPicture();
  }
});
