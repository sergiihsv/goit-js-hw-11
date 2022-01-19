import './css/styles.css';

import ImgApiService from './img-api-service';
import articlesTpl from './templates/photo-card.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imgApiService = new ImgApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSearch(event) {
  event.preventDefault();

  imgApiService.query = event.currentTarget.elements.searchQuery.value;

  if (imgApiService.query.trim() === '') {
    return alert('Sorry, there are no images matching your search query. Please try again.');
  }

  imgApiService.resetPage();
  imgApiService.fetchArticles().then(hits => {
    clearArticlesContainer();
    appendArticlesMarkup(hits);
  });
}

function onLoadMoreBtn() {
  imgApiService.fetchArticles().then(appendArticlesMarkup);
}

function appendArticlesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
}

function clearArticlesContainer() {
  refs.galleryContainer.innerHTML = '';
}
