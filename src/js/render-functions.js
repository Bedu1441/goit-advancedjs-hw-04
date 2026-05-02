import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const galleryMarkup = images
    .map(
      image => `
        <li class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
            <img
              class="gallery-image"
              src="${image.webformatURL}"
              alt="${image.tags}"
            />
          </a>

          <div class="gallery-info">
            <p class="gallery-info-item">
              <span class="gallery-info-title">Likes</span>
              <span class="gallery-info-value">${image.likes}</span>
            </p>
            <p class="gallery-info-item">
              <span class="gallery-info-title">Views</span>
              <span class="gallery-info-value">${image.views}</span>
            </p>
            <p class="gallery-info-item">
              <span class="gallery-info-title">Comments</span>
              <span class="gallery-info-value">${image.comments}</span>
            </p>
            <p class="gallery-info-item">
              <span class="gallery-info-title">Downloads</span>
              <span class="gallery-info-value">${image.downloads}</span>
            </p>
          </div>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('is-hidden');
}
