const allPictures = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures) => {
  const picturesFragment = document.createDocumentFragment();
  pictures.forEach(({url, description, likes, comments, id}) => {
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

export { renderPictures };
