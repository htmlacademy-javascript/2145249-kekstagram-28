import './createfullscreenpicture.js';
import {setUserFormSubmit, closePicture} from './form.js';
import './editnewphoto.js';
import {renderPicture} from './create-thumbnails.js';
import {openModal} from './showfullscreenpicture.js';
import {getData} from './api.js';
import { showAlert } from './util.js';

getData()
  .then((photos) => {
    renderPicture(photos);
    openModal(photos);
  })
  .catch((err) => {
    showAlert(err);
  });

setUserFormSubmit(closePicture);
