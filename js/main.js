import './create-fullscreen-picture.js';
import { setUserFormSubmit, closePicture } from './form.js';
import './edit-new-photo.js';
import { renderPictures, setFilerClickHadler } from './create-thumbnails.js';
import { setGalleryHandlers } from './show-fullscreen-picture.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import './new-photo.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    setFilerClickHadler(debounce(() => renderPictures(photos)), photos.length);
    setGalleryHandlers(photos);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  })
  .catch((err) => {
    showAlert(err);
  });

setUserFormSubmit(closePicture);
