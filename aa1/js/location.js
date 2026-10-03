const DEFAULT_LOCATION = { latitude: -22.015, longitude: -47.89 };
const LOCATION_KEY = 'bora-localizacao';
let currentLocation = DEFAULT_LOCATION;

try {
  const saved = JSON.parse(sessionStorage.getItem(LOCATION_KEY));
  if (saved && Number.isFinite(saved.latitude) && Number.isFinite(saved.longitude) &&
      Math.abs(saved.latitude) <= 90 && Math.abs(saved.longitude) <= 180) {
    currentLocation = saved;
  }
}
catch {
  currentLocation = DEFAULT_LOCATION;
}

function setCurrentLocation(coordinates) {
  currentLocation = coordinates || DEFAULT_LOCATION;

  try {
    if (coordinates) {
      sessionStorage.setItem(LOCATION_KEY, JSON.stringify(coordinates));
    }
    else {
      sessionStorage.removeItem(LOCATION_KEY);
    }
  }
  catch {
    // a localização continua disponível nesta página se o armazenamento estiver bloqueado
  }
}

function distanceTo(place) {
  const radians = Math.PI / 180;
  const latitudeDifference = (place.latitude - currentLocation.latitude) * radians;
  const longitudeDifference = (place.longitude - currentLocation.longitude) * radians;

  // fórmula de haversine para distância em linha reta, em quilômetros
  const a = Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(currentLocation.latitude * radians) * Math.cos(place.latitude * radians) *
    Math.sin(longitudeDifference / 2) ** 2;

  return 6371 * 2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, a))));
}

function formatDistance(distance) {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }

  return `${distance.toFixed(1).replace('.', ',')} km`;
}

function updateDistanceLabels() {
  for (const label of document.querySelectorAll('[data-distance-for]')) {
    const place = places.find(place => place.id === label.dataset.distanceFor);
    label.textContent = formatDistance(distanceTo(place));
  }

  const reference = document.getElementById('distance-reference');
  if (reference) {
    reference.textContent = currentLocation === DEFAULT_LOCATION
      ? 'Sugestões em São Carlos'
      : 'Perto de você';
  }
}
