const STORAGE_KEY = 'bora-favoritos-v1';

function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const favorites = [];

    if (Array.isArray(saved)) {
      for (const id of saved) {
        const place = places.find(place => place.id === id);
        if (place && !favorites.includes(id)) {
          favorites.push(id);
        }
      }
    }

    return favorites;
  }
  catch {
    return [];
  }
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);

  if (index === -1) {
    favorites.push(id);
  }
  else {
    favorites.splice(index, 1);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
  catch {
  }

  if (document.getElementById('favorites-list')) {
    renderFavorites();
  }

  updateFavoriteButtons();
}

function updateFavoriteButtons() {
  const favorites = getFavorites();
  const buttons = document.querySelectorAll('[data-favorite]');

  for (const button of buttons) {
    const saved = favorites.includes(button.dataset.favorite);
    button.textContent = saved ? 'Remover dos favoritos' : 'Favoritar';
    button.classList.toggle('bg-bora', saved);
    button.classList.toggle('text-white', saved);
  }
}

function stars(rating) {
  const rounded = Math.round(rating);
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

function renderRating(place) {
  const average = place.rating;
  const score = average.toFixed(1).replace('.', ',');

  return `
    <p class="text-sm">
      <span class="text-orange-700">${stars(average)}</span>
      ${score}/5 · ${place.reviewCount} avaliações
    </p>
  `;
}

function renderCard(place) {
  return `
    <article class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <a href="detalhes.html?id=${place.id}">
        <img src="${place.image}" alt="${place.imageAlt}" class="h-48 w-full object-cover">
      </a>
      <div class="flex flex-1 flex-col p-5">
        <p class="self-start rounded bg-bora-light px-2 py-1 text-xs font-bold text-bora">${place.category}</p>
        <h3 class="my-2 text-xl font-bold">${place.name}</h3>
        ${renderRating(place)}
        <p class="my-3 text-gray-600">${place.summary}</p>
        <p class="mb-4 text-sm font-bold">${place.distance} · ${place.price} · ${place.duration}</p>
        <a href="detalhes.html?id=${place.id}" class="mt-auto pt-2 text-bora underline">Ver detalhes</a>
        <button type="button" data-favorite="${place.id}" class="mt-4 rounded-lg border border-bora px-3 py-2 font-bold">Favoritar</button>
      </div>
    </article>
  `;
}

function filterPlaces() {
  const category = document.getElementById('category').value;
  const distance = Number(document.getElementById('distance').value);
  const price = Number(document.getElementById('price').value);
  const cards = document.querySelectorAll('#places-list article');
  let count = 0;

  for (const card of cards) {
    const matches = (category === 'all' || card.dataset.category === category) &&
      Number(card.dataset.distance) <= distance && Number(card.dataset.price) <= price;

    card.hidden = !matches;
    if (matches) {
      count += 1;
    }
  }

  document.getElementById('no-results').hidden = count > 0;
  document.getElementById('result-count').textContent =
    `${count} ${count === 1 ? 'lugar' : 'lugares'}`;
}

function showDetails() {
  const details = document.querySelectorAll('[data-place]');
  const id = new URLSearchParams(location.search).get('id') || details[0].dataset.place;
  let selected = null;

  for (const detail of details) {
    detail.hidden = detail.dataset.place !== id;
    if (!detail.hidden) {
      selected = detail;
    }
  }

  document.getElementById('place-not-found').hidden = selected !== null;
  document.title = selected
    ? `${selected.querySelector('h1').textContent} — Bora`
    : 'Lugar não encontrado — Bora';
}

function renderFavorites() {
  const selected = [];

  for (const id of getFavorites()) {
    selected.push(places.find(place => place.id === id));
  }

  document.getElementById('favorites-list').innerHTML = selected.map(renderCard).join('');
  document.getElementById('empty-favorites').hidden = selected.length > 0;
  document.getElementById('favorite-count').textContent =
    `${selected.length} ${selected.length === 1 ? 'lugar salvo' : 'lugares salvos'}`;
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-favorite]');

  if (button) {
    toggleFavorite(button.dataset.favorite);
  }
});

const filters = document.getElementById('filters');

if (filters) {
  filters.addEventListener('submit', event => {
    event.preventDefault();
    filterPlaces();
  });

  filterPlaces();
}

if (document.getElementById('place-detail')) {
  showDetails();
}

if (document.getElementById('favorites-list')) {
  renderFavorites();
}

window.addEventListener('storage', () => {
  if (document.getElementById('favorites-list')) {
    renderFavorites();
  }

  updateFavoriteButtons();
});

updateFavoriteButtons();
