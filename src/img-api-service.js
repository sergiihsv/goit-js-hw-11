const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25290744-d6d0934bf026089ed7a084fd9';
const PER_PAGE = 3;

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${PER_PAGE}`,
    )
      .then(r => r.json())
      .then(data => {
        console.log(data);
        this.incrementPage();
        return data.hits;
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
