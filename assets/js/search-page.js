import { fetchSearchResults } from './api.js';
import { renderCards, renderError, setLoading } from './render-html.js';
import { toggleFavorite } from './favorite-handler.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  const searchInput = document.getElementById('search-input');
  const searchTitle = document.querySelector('.search-results__query');
  const cardsGrid = document.querySelector('.cards-grid');

  if (searchInput && query) {
    searchInput.value = query;
  }

  if (searchTitle) {
    searchTitle.textContent = query || 'vacío';
  }

  if (!query) {
    if (cardsGrid) {
      cardsGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-secondary);padding:2rem;">Ingresá un término para ver resultados.</p>';
    }
    return;
  }

  setLoading();

  fetchSearchResults(query).then((results) => {
    if (!results || results.length === 0) {
      if (cardsGrid) {
        cardsGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-secondary);padding:2rem;">No encontramos resultados para "' + query + '". Probá con otra palabra.</p>';
      }
      return;
    }

    renderCards(results);
  }).catch((error) => {
    console.error('Error en la búsqueda:', error);
    renderError(error);
  });

  // Favoritos
  document.addEventListener('click', (e) => {
    const favoriteBtn = e.target.closest('.favorite-btn');

    if (!favoriteBtn) return;

    const itemData = favoriteBtn.dataset.item;

    if (!itemData) return;

    const item = JSON.parse(itemData);

    const isNowFavorite = toggleFavorite(item);

    if (isNowFavorite) {
      favoriteBtn.classList.add('active');
    } else {
      favoriteBtn.classList.remove('active');
    }
  });
});

