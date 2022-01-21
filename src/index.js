import './css/styles.css';

import ImgApiService from './img-api-service';
import articlesTpl from './templates/photo-card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const PER_PAGE = 12;

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imgApiService = new ImgApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

putLoadMoreBtn();

function onSearch(event) {
  event.preventDefault();

  imgApiService.query = event.currentTarget.elements.searchQuery.value;

  if (imgApiService.query.trim() === '') {
    Notiflix.Notify.info('Please, enter you search query.');
    clearArticlesContainer();
    putLoadMoreBtn();
    return;
  }

  imgApiService.resetPage();
  imgApiService.fetchArticles().then(hits => {
    clearArticlesContainer();
    appendArticlesMarkup(hits);
    showLoadMoreBtn();
    galleryModal.refresh();
  });
}

function onLoadMoreBtn() {
  imgApiService.fetchArticles().then(appendArticlesMarkup);
}

function appendArticlesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
  galleryModal.refresh();
}

function clearArticlesContainer() {
  refs.galleryContainer.innerHTML = '';
}

function putLoadMoreBtn() {
  document.querySelector('.load-more').classList.add('is-hidden');
}

function showLoadMoreBtn() {
  document.querySelector('.load-more').classList.remove('is-hidden');
}

const galleryModal = new SimpleLightbox('.gallery a', {});
