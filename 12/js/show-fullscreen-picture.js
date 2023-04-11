import { isEscapeKey, isEnterKey } from './util.js';
import { renderFullPicture, clearFullPicture, renderComments } from './create-fullscreen-picture.js';

const allPictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closePicture = bigPicture.querySelector('.big-picture__cancel');
const showMoreComments = document.querySelector('.social__comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
};

function openFullPicture (evt,pictures) {

  if(evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');
    const target = evt.target.closest('.picture');
    const pictureData = pictures.find((photoData) => photoData.id === Number(target.dataset.index));
    renderFullPicture(pictureData);
    document.body.classList.add('modal-open');
  }
  showMoreComments.addEventListener('click', renderComments);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFullPicture () {
  bigPicture.classList.add('hidden');
  clearFullPicture();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const setGalleryHandlers = (pictures) => {
  allPictures.addEventListener('click', (evt) => {
    openFullPicture(evt, pictures);
  });
  allPictures.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openFullPicture(evt, pictures);
    }
  });
};

closePicture.addEventListener('click', () => {
  closeFullPicture();
});

closePicture.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeFullPicture();
  }
});

export {setGalleryHandlers};
