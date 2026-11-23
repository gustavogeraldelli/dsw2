export const DEFAULT_LOCATION = { latitude: -22.015, longitude: -47.89 };

export function getLocation() {
  try {
    const saved = JSON.parse(sessionStorage.getItem('bora-localizacao'));
    if (saved && Number.isFinite(saved.latitude) && Number.isFinite(saved.longitude) &&
        Math.abs(saved.latitude) <= 90 && Math.abs(saved.longitude) <= 180) {
      return saved;
    }
  }
  catch {
    return DEFAULT_LOCATION;
  }

  return DEFAULT_LOCATION;
}

export function locationWasRequested() {
  try {
    return sessionStorage.getItem('bora-localizacao-solicitada') === 'true';
  }
  catch {
    return false;
  }
}

export function distanceTo(place, coordinates) {
  const radians = Math.PI / 180;
  const latitudeDifference = (place.latitude - coordinates.latitude) * radians;
  const longitudeDifference = (place.longitude - coordinates.longitude) * radians;

  // fórmula de haversine para distância em linha reta, em quilômetros
  const a = Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(coordinates.latitude * radians) * Math.cos(place.latitude * radians) *
    Math.sin(longitudeDifference / 2) ** 2;

  return 6371 * 2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, a))));
}

export function formatDistance(distance) {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }

  return `${distance.toFixed(1).replace('.', ',')} km`;
}
