document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search__btn');

  if (!searchInput || !searchBtn) {
    return;
  }

  function handleSearch(event) {
    if (event) {
      event.preventDefault();
    }

    const query = searchInput.value.trim();
    if (!query) return;

    const url = '/pages/search.html?q=' + encodeURIComponent(query);
    window.location.href = url;
  }

  searchBtn.addEventListener('click', handleSearch);

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  });
});

