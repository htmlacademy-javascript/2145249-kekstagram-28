const allPictures = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterContainer = document.querySelector('.img-filters__form');
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

const sorting = (render, allPhotos) => {
  filterContainer.addEventListener('click', (evt) => {
    hideUnchosenFilter();
    showChosenFilter(evt);
    photosCount = allPhotos;
    document.querySelectorAll('.picture').forEach((element)=>element.remove());
    if(evt.target.id === 'filter-default') {
      comparePictures = () => true;
    }
    if(evt.target.id === 'filter-random') {
      comparePictures = () => (Math.random() - 0.5);
      photosCount = RANDOM_PHOTO_COUNT;
    }
    if(evt.target.id === 'filter-discussed') {
      comparePictures = (pictureA, pictureB) => {
        const rankA = pictureA.comments.length;
        const rankB = pictureB.comments.length;
        return rankB - rankA;
      };
    }
    render();
  });
};

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

export { renderPictures, sorting };
