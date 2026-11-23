import { places } from './data/places';

export const FAVORITES_KEY = 'bora-favoritos-v1';
export const PREFERENCES_KEY = 'bora-preferencias-v1';
export const THEME_KEY = 'bora-tema';

export function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    const favorites = [];

    if (Array.isArray(saved)) {
      for (const id of saved) {
        if (places.some(place => place.id === id) && !favorites.includes(id)) {
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

export function getPreferences() {
  const preferences = { distance: 5, categories: [] };

  try {
    const saved = JSON.parse(localStorage.getItem(PREFERENCES_KEY));
    if (saved && [5, 10, 20].includes(saved.distance)) {
      preferences.distance = saved.distance;
    }

    if (saved && Array.isArray(saved.categories)) {
      for (const category of ['Ao ar livre', 'Cultura', 'Comer']) {
        if (saved.categories.includes(category)) {
          preferences.categories.push(category);
        }
      }
    }
  }
  catch {
    return preferences;
  }

  return preferences;
}

export function getDarkMode() {
  try {
    return localStorage.getItem(THEME_KEY) === 'escuro';
  }
  catch {
    return false;
  }
}
