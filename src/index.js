import './css/styles.css';
import PhotoCardTpl from './templates/photo-card.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '25290744-d6d0934bf026089ed7a084fd9';

  fetch(
    'https://pixabay.com/api/?key=25290744-d6d0934bf026089ed7a084fd9&q=cat&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40',
  )
    .then(r => r.json())
    .then(console.log);
}
