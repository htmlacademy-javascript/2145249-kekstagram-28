import './create-thumbnails.js';
//import './showfullscreenpicture.js';
import './createfullscreenpicture.js';
import './form.js';
import './editnewphoto.js';
import {renderPicture} from './create-thumbnails.js';
import {openModal} from './showfullscreenpicture.js';

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderPicture(photos);
    openModal(photos);
  });
