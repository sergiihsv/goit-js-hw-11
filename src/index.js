import './css/styles.css';
import './sass/main.scss';
import PhotoCardTpl from './templates/photo-card.hbs';
import ImgApiService from './img-api-service';

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
  imgApiService.resetPage();
  imgApiService.fetchArticles();
}

function onLoadMoreBtn() {
  imgApiService.fetchArticles();
}
