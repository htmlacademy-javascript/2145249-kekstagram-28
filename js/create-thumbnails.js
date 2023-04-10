const allPictures = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');
const RANDOM_PHOTO_COUNT = 10;

const showChosenFilter = (evt) => {
  evt.target.classList.add('img-filters__button--active');
};

const hideUnchosenFilter = () => {
  const allButtons = document.querySelectorAll('.img-filters__button');
  allButtons.forEach((element)=>element.classList.remove('img-filters__button--active'));
};


let comparePictures = () => true;
let photosCount;

const defaultSort = (render, photosCountDefault) => {
  defaultButton.addEventListener('click', (evt) => {
    hideUnchosenFilter();
    showChosenFilter(evt);
    document.querySelectorAll('.picture').forEach((element)=>element.remove());
    photosCount = photosCountDefault;
    comparePictures = () => true;
    render();
  });
};

const randomSort = (render) => {
  randomButton.addEventListener('click', (evt) => {
    hideUnchosenFilter();
    showChosenFilter(evt);
    document.querySelectorAll('.picture').forEach((element)=>element.remove());
    photosCount = RANDOM_PHOTO_COUNT;
    comparePictures = () => (Math.random() - 0.5);
    render();
  });
};

const discussedSort = (render, photosCountDefault) => {
  discussedButton.addEventListener('click', (evt) => {
    hideUnchosenFilter();
    showChosenFilter(evt);
    document.querySelectorAll('.picture').forEach((element)=>element.remove());
    photosCount = photosCountDefault;
    comparePictures = (pictureA, pictureB) => {
      const rankA = pictureA.comments.length;
      const rankB = pictureB.comments.length;
      return rankB - rankA;
    };
    render();
  });
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const renderPictures = (pictures) => {
  const picturesFragment = document.createDocumentFragment();
  pictures
    .slice()
    .sort(comparePictures)
    .slice(0, photosCount)
    .forEach(({url, description, likes, comments, id}) => {
      const userElement = picturesTemplate.cloneNode(true);
      userElement.querySelector('.picture__img').src = url;
      userElement.querySelector('.picture__img').alt = description;
      userElement.querySelector('.picture__likes').textContent = likes;
      userElement.querySelector('.picture__comments').textContent = comments.length;
      userElement.dataset.index = id;
      picturesFragment.append(userElement);
    });
  allPictures.appendChild(picturesFragment);
};

export { renderPictures, debounce, defaultSort, randomSort, discussedSort };
