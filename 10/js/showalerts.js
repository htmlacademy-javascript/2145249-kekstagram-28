import { isEscapeKey } from './util.js';

const showAlertError = () => {
  const alertContainerTemplate = document.querySelector('#error').content.querySelector('.error');
  const alertContainer = alertContainerTemplate.cloneNode(true);
  document.body.append(alertContainer);
  const error = document.querySelector('.error');
  const closeError = document.querySelector('.error__button');
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeAlert();
    }
  };
  function closeAlert () {
    error.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  closeError.addEventListener('click', () => {
    closeAlert();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeAlert();
    }
  });

  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeAlert();
    }
  });
};

const showAlertSuccess = () => {
  const alertContainerTemplate = document.querySelector('#success').content.querySelector('.success');
  const alertContainer = alertContainerTemplate.cloneNode(true);
  document.body.append(alertContainer);
  const closeSuccess = document.querySelector('.success__button');
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeAlert();
    }
  };
  function closeAlert () {
    alertContainer.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  closeSuccess.addEventListener('click', () => {
    closeAlert();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeAlert();
    }
  });

  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeAlert();
    }
  });
};

export {showAlertSuccess, showAlertError};
