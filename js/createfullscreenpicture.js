const fullPicture = document.querySelector('.big-picture');
const bigImage = fullPicture.querySelector('.big-picture__img img');
const likes = fullPicture.querySelector('.likes-count');
const commentsCount = fullPicture.querySelector('.comments-count');
const description = fullPicture.querySelector('.social__caption');
const comments = fullPicture.querySelector('.social__comments');

const renderFullPicture = (picture) => {
  bigImage.src = picture.url;
  likes.textContent = picture.likes;
  description.textContent = picture.description;
  commentsCount.textContent = picture.comments.length;
  comments.innerHTML = '';
  for (let i = 0; i < picture.comments.length; i++) {
    comments.innerHTML += (`<li class="social__comment">
    <img
      class="social__picture"
      src="${picture.comments[i].avatar}"
      alt="${picture.comments[i].name}"
      width="35" height="35">
      <p class="social__text">${picture.comments[i].message}</p>
    </li>`);
  }
  fullPicture.querySelector('.social__comment-count').classList.add('hidden');
  fullPicture.querySelector('.comments-loader').classList.add('hidden');
};

const clearFullPicture = () => {
  comments.innerHTML = '';
};

export {renderFullPicture, clearFullPicture};
