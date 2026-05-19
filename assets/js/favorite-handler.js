const FAVORITES_KEY = 'favorites';

// GETTER
export function getFavorites() {
  return JSON.parse(
    localStorage.getItem(FAVORITES_KEY)
  ) || [];
}

// SETTER
export function saveFavorites(favorites) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}

// TOGGLE
export function toggleFavorite(item) {

  const favorites = getFavorites();

  const exists = favorites.some(
    fav => fav.favoriteId === item.favoriteId
  );

  let updatedFavorites;

  if (exists) {

    updatedFavorites = favorites.filter(
      fav => fav.favoriteId !== item.favoriteId
    );

  } else {

    updatedFavorites = [
      ...favorites,
      item
    ];

  }

  saveFavorites(updatedFavorites);

  return !exists;
}