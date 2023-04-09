import './create-fullscreen-picture.js';
import {setUserFormSubmit, closePicture} from './form.js';
import './edit-new-photo.js';
import {renderPictures} from './create-thumbnails.js';
import {setGalleryHandlers} from './show-fullscreen-picture.js';
import {getData} from './api.js';
import { showAlert } from './util.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    setGalleryHandlers(photos);
  })
  .catch((err) => {
    showAlert(err);
  });

setUserFormSubmit(closePicture);
