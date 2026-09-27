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

  renderPage();
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

function averageRating(place) {
  let total = 0;

  for (const review of place.reviews) {
    total += review.rating;
  }

  return total / place.reviews.length;
}

function stars(rating) {
  const rounded = Math.round(rating);
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

function renderRating(place) {
  const average = averageRating(place);
  const score = average.toFixed(1).replace('.', ',');

  return `
    <p class="text-sm">
      <span class="text-orange-700">${stars(average)}</span>
      ${score}/5 · ${place.reviews.length} avaliações
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

function renderHome() {
  const category = document.getElementById('category').value;
  const distance = Number(document.getElementById('distance').value);
  const price = Number(document.getElementById('price').value);
  const visible = [];

  for (const place of places) {
    if ((category === 'all' || place.category === category) &&
        place.distanceKm <= distance && place.priceValue <= price) {
      visible.push(place);
    }
  }

  document.getElementById('places-list').innerHTML = visible.map(renderCard).join('');
  document.getElementById('no-results').hidden = visible.length > 0;
  document.getElementById('result-count').textContent =
    `${visible.length} ${visible.length === 1 ? 'lugar' : 'lugares'}`;
}

function renderReview(review) {
  let photo = '';

  if (review.photo) {
    photo = `
      <figure class="mt-4">
        <img src="${review.photo}" alt="${review.photoAlt}" class="h-24 w-40 rounded object-cover">
      </figure>
    `;
  }

  return `
    <article class="rounded-lg border border-gray-200 bg-white p-5">
      <h3 class="font-bold">${review.name}</h3>
      <p class="my-2"><span class="text-orange-700">${stars(review.rating)}</span> ${review.rating}/5</p>
      <p>${review.text}</p>
      ${photo}
    </article>
  `;
}

function renderDetails() {
  const id = new URLSearchParams(location.search).get('id') || places[0].id;
  const place = places.find(place => place.id === id);

  if (!place) {
    document.title = 'Lugar não encontrado — Bora';
    document.getElementById('place-detail').innerHTML = `
      <h1 class="my-4 text-3xl font-bold">Lugar não encontrado</h1>
      <a href="index.html" class="text-bora underline">Voltar para a Home</a>
    `;
    return;
  }

  document.title = `${place.name} — Bora`;
  document.getElementById('place-image').src = place.image;
  document.getElementById('place-image').alt = place.imageAlt;
  document.getElementById('place-name').textContent = place.name;
  document.getElementById('place-category').textContent = place.category;
  document.getElementById('place-description').textContent = place.description;
  document.getElementById('place-distance').textContent = place.distance;
  document.getElementById('place-price').textContent = place.price;
  document.getElementById('place-duration').textContent = place.duration;
  document.getElementById('place-address').textContent = place.address;
  document.getElementById('place-hours').textContent = place.hours;
  document.getElementById('place-rating').innerHTML = renderRating(place);
  document.getElementById('detail-favorite').dataset.favorite = place.id;
  document.getElementById('reviews-list').innerHTML = place.reviews.map(renderReview).join('');
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

function renderPage() {
  if (document.getElementById('places-list')) {
    renderHome();
  }

  if (document.getElementById('place-detail')) {
    renderDetails();
  }

  if (document.getElementById('favorites-list')) {
    renderFavorites();
  }

  updateFavoriteButtons();
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
    renderHome();
    updateFavoriteButtons();
  });
}

window.addEventListener('storage', renderPage);
renderPage();
