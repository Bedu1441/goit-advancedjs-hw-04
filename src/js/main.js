import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import '../css/styles.css';

import { getImagesByQuery } from './pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './render-functions.js';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

const PER_PAGE = 15;

let searchQuery = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', handleFormSubmit);
loadMoreButton.addEventListener('click', handleLoadMoreClick);

async function handleFormSubmit(event) {
  event.preventDefault();

  const query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });

    return;
  }

  searchQuery = query;
  page = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);

    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(data.hits);

    if (isLastPage()) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
      return;
    }

    showLoadMoreButton();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMoreClick() {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);

    createGallery(data.hits);
    scrollPage();

    if (isLastPage()) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
      return;
    }

    showLoadMoreButton();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });

    showLoadMoreButton();
  } finally {
    hideLoader();
  }
}

function isLastPage() {
  return page * PER_PAGE >= totalHits;
}

function showEndOfResultsMessage() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

function scrollPage() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) {
    return;
  }

  const cardHeight = galleryItem.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
