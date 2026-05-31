import { renderCards } from "./render-html.js";
import { toggleFavorite } from "./favorite-handler.js";

document.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        document.querySelector('.cards-grid').innerHTML = `
          <p style="text-align:center;padding:2rem;">
            No tenés favoritos todavía ❤️
          </p>
        `;

        return;
    }
    renderCards(favorites);

    document.addEventListener('click', (e) => {

    const favoriteBtn = e.target.closest('.favorite-btn');

    if (!favoriteBtn) return;

    const itemData = favoriteBtn.dataset.item;

    if (!itemData) return;

    const item = JSON.parse(itemData);

    // reutiliza lógica
    toggleFavorite(item);

    // remover card visualmente
    const card = favoriteBtn.closest('.card');

    card.remove();

    });
});