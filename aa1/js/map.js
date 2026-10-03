function renderMapCard(place) {
  const score = place.rating.toFixed(1).replace('.', ',');
  const rating = Math.round(place.rating);
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  return `
    <article class="map-card w-56 overflow-hidden rounded-lg bg-white text-gray-800">
      <img src="${place.image}" alt="${place.imageAlt}" class="h-24 w-full object-cover">
      <div class="flex flex-col gap-2 p-3">
        <p class="self-start rounded bg-bora-light px-2 py-1 text-xs font-bold text-bora">${place.category}</p>
        <h2 class="text-lg font-bold">${place.name}</h2>
        <p class="text-sm">
          <span class="text-orange-700">${stars}</span>
          ${score}/5 · ${place.reviewCount} avaliações
        </p>
        <p class="text-sm text-gray-600">${place.summary}</p>
        <p class="text-sm font-bold">${place.price} · ${place.duration}</p>
        <a href="detalhes.html?id=${place.id}" class="underline">Ver detalhes</a>
      </div>
    </article>
  `;
}

const mapStatus = document.getElementById('map-status');
const locationButton = document.getElementById('find-location');

if (typeof L === 'undefined') {
  mapStatus.textContent = 'O mapa precisa de conexão com a internet para carregar.';
  locationButton.addEventListener('click', () => {
    mapStatus.textContent = 'Recarregue a página com conexão à internet para usar o mapa.';
  });
}
else {
  const map = L.map('map', {
    minZoom: 2,
    maxZoom: 19,
    worldCopyJump: true
  }).setView([-22.015, -47.89], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  map.on('popupopen', event => {
    // recalcula o popup depois que os estilos do card são aplicados
    requestAnimationFrame(() => {
      event.popup.update();
    });
  });

  const positions = [];
  for (const place of places) {
    const position = [place.latitude, place.longitude];
    positions.push(position);
    L.marker(position).addTo(map).bindPopup(renderMapCard(place), {
      maxWidth: 240,
      maxHeight: Math.min(360, map.getSize().y - 80)
    });
  }
  map.fitBounds(positions, { padding: [30, 30], maxZoom: 14 });

  let userMarker = null;

  function showPosition(position) {
    setCurrentLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    const coordinates = [currentLocation.latitude, currentLocation.longitude];

    if (userMarker) {
      userMarker.setLatLng(coordinates);
    }
    else {
      userMarker = L.circleMarker(coordinates, {
        radius: 8,
        color: '#326080',
        fillOpacity: 1
      }).addTo(map).bindPopup('Sua localização');
    }

    map.setView(coordinates, 15);
    userMarker.openPopup();
    mapStatus.textContent = '';
    locationButton.disabled = false;
  }

  if (currentLocation !== DEFAULT_LOCATION) {
    showPosition({ coords: currentLocation });
  }

  function showLocationError(error) {
    if (error.code === 1) {
      mapStatus.textContent = 'Permissão de localização negada. Você pode continuar explorando o mapa.';
    }
    else {
      mapStatus.textContent = 'Não foi possível obter sua localização. Tente novamente.';
    }

    locationButton.disabled = false;
  }

  locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
      mapStatus.textContent = 'Este navegador não oferece geolocalização.';
      return;
    }

    mapStatus.textContent = 'Buscando sua localização...';
    locationButton.disabled = true;
    navigator.geolocation.getCurrentPosition(showPosition, showLocationError, {
      timeout: 10000
    });
  });
}
