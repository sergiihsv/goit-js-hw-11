const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25290744-d6d0934bf026089ed7a084fd9';
const PER_PAGE = 8;

import axios from 'axios';
import Notiflix from 'notiflix';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    return await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${PER_PAGE}`,
    )
      .then(r => r.json())
      .then(({ hits }) => {
        console.log(hits);
        if (hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no more images matching your search query. Please try new search.',
          );
        }
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
