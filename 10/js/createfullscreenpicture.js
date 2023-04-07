const fullPicture = document.querySelector('.big-picture');
const bigImage = fullPicture.querySelector('.big-picture__img img');
const likes = fullPicture.querySelector('.likes-count');
const fullCommentCount = fullPicture.querySelector('.social__comment-count');
const description = fullPicture.querySelector('.social__caption');
const comments = fullPicture.querySelector('.social__comments');
const commentList = fullPicture.querySelector('.social__comment');
const commentsLoader = fullPicture.querySelector('.comments-loader');
const MIN_COMMENT_COUNT = 5;
let shownComments = 0;
let moreComments = [];

const renderComments = () => {
  shownComments += MIN_COMMENT_COUNT;
  if(shownComments >= moreComments.length) {
    commentsLoader.classList.add('hidden');
    shownComments = moreComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < shownComments; i++) {
    const currentComment = commentList.cloneNode(true);
    currentComment.querySelector('.social__picture').src = moreComments[i].avatar;
    currentComment.querySelector('.social__picture').alt = moreComments[i].name;
    currentComment.querySelector('.social__text').textContent = moreComments[i].message;
    fragment.append(currentComment);
  }
  comments.innerHTML = '';
  comments.appendChild(fragment);
  fullCommentCount.innerHTML = `${shownComments} из <span class="comments-count">${moreComments.length}</span>`;
};

const renderFullPicture = (picture) => {
  bigImage.src = picture.url;
  likes.textContent = picture.likes;
  description.textContent = picture.description;
  moreComments = picture.comments;
  shownComments = 0;
  renderComments();
};

const clearFullPicture = () => {
  moreComments = [];
  comments.innerHTML = '';
};

export {renderFullPicture, clearFullPicture, renderComments};
