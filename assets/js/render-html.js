const cardsGrid = document.querySelector('.cards-grid');

// función para renderizar las tarjetas de recomendaciones
export function renderCards(data) {

  cardsGrid.innerHTML = '';

  if (data.length === 0) {

    cardsGrid.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;color:var(--color-text-secondary);padding:2rem;">
        No encontramos contenido exacto para ese tiempo, ¡pero podés probar con otro filtro!
      </p>`;

    return;
  }

  // Obtener favoritos guardados
  const favorites =
    JSON.parse(localStorage.getItem('favorites')) || [];

  data.forEach(item => {

    // id unico por item
    const favoriteId =
      `${item.type}-${item.title}-${item.artist || ''}`;

    // checkea si ya es favorito
    const isFavorite = favorites.some(
      fav => fav.favoriteId === favoriteId
    );

    const isFeatured = item.featured
      ? `<span class="card__featured-tag" aria-label="Destacado">★ Destacado</span>`
      : '';

    const featuredClass = item.featured
      ? 'card--featured'
      : '';

    const artistLine = item.artist
      ? `<span class="card__artist">${item.artist}</span>`
      : '';

    // Guardar item + favoriteId
    const favoriteItem = {
      ...item,
      favoriteId
    };

    const cardHTML = `
      <li class="card ${featuredClass}" aria-label="${item.type}: ${item.title}">
        <article>

          <div class="card__image-wrap">

            <img
              class="card__image"
              src="${item.img}"
              alt="${item.title}"
              loading="lazy"
              width="400"
              height="400"
              onerror="this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop'"
            />

            <span
              class="card__badge card__badge--${item.badgeClass}"
              aria-label="Categoría: ${item.type}"
            >
              ${item.icon} ${item.type}
            </span>

            ${isFeatured}

            <button
              class="favorite-btn ${isFavorite ? 'active' : ''}"
              aria-label="Agregar a favoritos"
              data-item='${JSON.stringify(favoriteItem)}'
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <div class="card__overlay" aria-hidden="true"></div>

          </div>

          <div class="card__body">

            <h3 class="card__title">
              ${item.title}
            </h3>

            ${artistLine}

            <div class="card__meta">

              <span class="card__duration">

                <svg
                  aria-hidden="true"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>

                ${item.duration}

              </span>

              <span class="card__genre">
                ${item.genre}
              </span>

            </div>

            <div class="card__actions">

              <button
                class="action-btn card__dismiss-btn"
                aria-label="No me interesa"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

            </div>

          </div>

        </article>
      </li>
    `;

    cardsGrid.insertAdjacentHTML(
      'beforeend',
      cardHTML
    );

  });

}

// Función para renderizar mensaje de error
export function renderError(error) {

  cardsGrid.innerHTML = `
    <p style="grid-column:1/-1;text-align:center;color:var(--color-text-secondary);padding:2rem;">
      ❌ No pudimos conectarnos con iTunes.
      Verificá tu conexión y volvé a intentarlo.
      <br/>
      <small style="opacity:.6;">
        ${error.message}
      </small>
    </p>
  `;

}

// Función para mostrar estado de carga
export function setLoading() {

  cardsGrid.innerHTML = `
    <p style="grid-column:1/-1;text-align:center;color:var(--color-text-secondary);padding:2rem;">
      ⏳ Buscando recomendaciones…
    </p>`;

}