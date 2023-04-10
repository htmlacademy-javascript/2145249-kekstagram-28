import { isEscapeKey } from './util.js';

const showAlert = (type) => {
  const alertContainerTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const alertContainer = alertContainerTemplate.cloneNode(true);
  document.body.append(alertContainer);
  const shownAlert = document.querySelector(`.${type}`);
  const closeButton = document.querySelector(`.${type}__button`);
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeAlert();
    }
  };
  function closeAlert () {
    shownAlert.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    return false;
  }

  closeButton.addEventListener('click', () => {
    closeAlert();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeAlert();
    }
  });

  document.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${type}__inner`)) {
      closeAlert();
    }
  });
};

export {showAlert};
