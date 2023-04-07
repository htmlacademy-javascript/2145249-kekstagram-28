//import { createDescriptions } from './data.js';

const allPictures = document.querySelector('.pictures');
const usersPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture = (usersPictures) => {
  const usersPicturesFragment = document.createDocumentFragment();
  usersPictures.forEach(({url, description, likes, comments, id}) => {
    const userElement = usersPicturesTemplate.cloneNode(true);
    userElement.querySelector('.picture__img').src = url;
    userElement.querySelector('.picture__img').alt = description;
    userElement.querySelector('.picture__likes').textContent = likes;
    userElement.querySelector('.picture__comments').textContent = comments.length;
    userElement.dataset.index = id;
    usersPicturesFragment.append(userElement);
  });
  allPictures.appendChild(usersPicturesFragment);
};
//const usersPictures = createDescriptions();

//console.log(renderPicture());
export {/*usersPictures,*/ renderPicture};
