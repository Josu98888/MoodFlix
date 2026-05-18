import { fetchRecommendations } from './api.js';
import { renderCards, renderError, setLoading } from './render-html.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.filters');
  const resultsSubtitle = document.querySelector('.results__subtitle');

  // ----------------------------------------------------------------
  // Submit: fetch + filtro por tiempo
  // ----------------------------------------------------------------
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const activeMoodBtn = document.querySelector('.mood-btn--active');
    const selectedMoodValue = activeMoodBtn.dataset.mood;
    const selectedMoodText = activeMoodBtn.querySelector('.mood-btn__label').textContent;

    const selectedTimeRadio = document.querySelector('input[name="time"]:checked');
    const selectedTimeValue = parseInt(selectedTimeRadio.value);
    const selectedTimeText = selectedTimeRadio.nextElementSibling.textContent;

    if (resultsSubtitle) {
      resultsSubtitle.innerHTML = `Basado en tu estado de ánimo <strong id="results-mood-label">${selectedMoodText}</strong> · ${selectedTimeText}`;
    }

    const resultsSection = document.querySelector('.results');
    if (resultsSection) resultsSection.hidden = false;

    setLoading();

    try {
      const allResults = await fetchRecommendations(selectedMoodValue);

      const filteredResults = allResults
        .filter(item =>
          selectedTimeValue === 120
            ? true
            : item.durationMin <= selectedTimeValue
        )
        .sort((a, b) => b.durationMin - a.durationMin);

      renderCards(filteredResults);

    } catch (error) {
      console.error('Error al consultar la API:', error);
      renderError(error);
    }
  });

  // ----------------------------------------------------------------
  // Delegación de eventos: Eliminar tarjeta
  // ----------------------------------------------------------------
  document.addEventListener('click', (e) => {

    const dismissBtn = e.target.closest('.card__dismiss-btn');

    if (dismissBtn) {

      const card = dismissBtn.closest('.card');

      card.style.transform = 'scale(0.9)';
      card.style.opacity = '0';
      card.style.transition = 'all 0.3s ease';

      setTimeout(() => card.remove(), 300);
    }

  });

  // ----------------------------------------------------------------
  // Delegación de eventos: Favoritos
  // ----------------------------------------------------------------

  const FAVORITES_KEY = 'favorites';

  // GETTER de favoritos
  function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  }

  // SETTER de favoritos
  function saveFavorites(favorites) {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites)
    );
  }

  // Añade o elimina el item de favoritos
  function toggleFavorite(item) {

    const favorites = getFavorites();
    const exists = favorites.some(
      fav => fav.favoriteId === item.favoriteId
    );

    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter(
        fav => fav.favoriteId !== item.favoriteId
      );

    }
    else {

      updatedFavorites = [
        ...favorites,
        item
      ];
    }

    saveFavorites(updatedFavorites);
    return !exists;
  }

  // Revisar si usuario clickea en botón de favorito
  document.addEventListener('click', (e) => {

    const favoriteBtn = e.target.closest('.favorite-btn');

    if (!favoriteBtn) return;

    const itemData = favoriteBtn.dataset.item;

    if (!itemData) return;

    const item = JSON.parse(itemData);

    const isNowFavorite = toggleFavorite(item);

    favoriteBtn.classList.toggle(
      'active',
      isNowFavorite
    );

  });

});