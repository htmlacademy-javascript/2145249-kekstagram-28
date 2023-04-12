import { isEscapeKey, isEnterKey} from './util.js';
import { showAlert } from './show-alerts.js';
import { resetEffects, resetScale } from './edit-new-photo.js';
import { sendData } from './api.js';

const form = document.querySelector('.img-upload__form');
const formContainer = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');
const fieldHashtag = document.querySelector('.text__hashtags');
const fieldDescription = document.querySelector('.text__description');
const MAX_HASHTAG_COUNT = 5;
const submitButton = formContainer.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});


const onDocumentKeydown = (evt) => {
  const isOpen = document.querySelector('.error');
  if (isEscapeKey(evt) && !isOpen) {
    evt.preventDefault();
    closePicture();
  }
};

function closePicture () {
  formContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
  uploadFile.value = '';
  resetEffects();
  resetScale();
  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadFile.addEventListener('input', () => {
  if(uploadFile.value) {
    formContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
  document.addEventListener('keydown', onDocumentKeydown);
});

uploadCancel.addEventListener('click', () => {
  closePicture();
});

uploadCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePicture();
  }
});

fieldHashtag.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});
fieldHashtag.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

fieldDescription.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});
fieldDescription.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

const ValidHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const isValidHashtag = (tag) => ValidHashtag.test(tag);

const isValidHashtagCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const isUniqueHashTag = (tags) => {
  const lowerCaseTag = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTag.length === new Set(lowerCaseTag).size;
};

const validateHashtags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return tags.every(isValidHashtag) && isValidHashtagCount(tags) && isUniqueHashTag(tags);
};

pristine.addValidator(form.querySelector('.text__hashtags'), validateHashtags, 'Неправильно заполнены хэш-теги');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(
          () => {
            showAlert('success');
          }
        )
        .catch(
          () => {
            showAlert('error');
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(form.querySelector('.text__description'), validateDescription, 'Комментарий не более 140 символов');

export {setUserFormSubmit, closePicture};
