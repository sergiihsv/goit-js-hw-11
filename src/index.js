import './css/styles.css';

import ImgApiService from './img-api-service';
import articlesTpl from './templates/photo-card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

/* const PER_PAGE = 12; */

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imgApiService = new ImgApiService();

console.log(imgApiService);

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
    fetchArticles();
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

function countOfImages() {
  if (/* imgApiService.page === totalImages &&  */ totalImages !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
  }
}

const galleryModal = new SimpleLightbox('.gallery a', {});

async function fetchArticles() {
  putLoadMoreBtn();

  try {
    const images = await imgApiService.fetchArticles();
    countOfImages();

    if (images.length === 0) {
      putLoadMoreBtn();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      refs.galleryContainer.innerHTML = '';
    }
    render(images);

    galleryModal.refresh();

    if (images.length < imgApiService.perPage) {
      putLoadMoreBtn();
    }
    /* showLoadMoreBtn(); */
    /* Notiflix.Notify.failure('Sorry.Something wrong('); */
  } catch {}
}

function countOfImages() {
  const quantityImagesOnPage = imgApiService.perPage;
  const currentImages = imgApiService.page * imgApiService.perPage - imgApiService.perPage;
  const totalImages = imgApiService.totalImages;

  if (/* imgApiService.page === totalImages &&  */ totalImages !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
  }

  if (currentImages > totalImages && totalImages !== 0 && totalImages > quantityImagesOnPage) {
    putLoadMoreBtn();
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search ${totalImages} results`,
    );
  }

  console.log(quantityImagesOnPage);
  console.log(currentImages);
  console.log(totalImages);
  console.log(imgApiService.page);
}

console.log(imgApiService);

/* 

function countOfImages() {
  const quantityImagesOnPage = imgApiService.perPage;
  const currentImages = imgApiService.page * imgApiService.perPage - imgApiService.perPage;
  const totalImages = imgApiService.totalImages;

  if (currentImages === quantityImagesOnPage && totalImages !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
  }

  if (currentImages > totalImages && totalImages !== 0 && totalImages > quantityImagesOnPage) {
    putLoadMoreBtn();
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search ${totalImages} results`,
    );
  }

  console.log(quantityImagesOnPage);
  console.log(currentImages);
  console.log(totalImages);
  console.log(imgApiService.page);
}
 */
