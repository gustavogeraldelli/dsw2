const PREFERENCES_KEY = 'bora-preferencias-v1';

function getPreferences() {
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

const preferencesForm = document.getElementById('preferences-form');

if (preferencesForm) {
  const preferences = getPreferences();
  const distance = document.getElementById('preferred-distance');
  const categories = preferencesForm.querySelectorAll('[name="category"]');
  const status = document.getElementById('preferences-status');

  distance.value = preferences.distance;
  for (const checkbox of categories) {
    checkbox.checked = preferences.categories.includes(checkbox.value);
  }

  preferencesForm.addEventListener('change', () => {
    status.textContent = '';
  });

  preferencesForm.addEventListener('submit', event => {
    event.preventDefault();
    const selected = [];

    for (const checkbox of categories) {
      if (checkbox.checked) {
        selected.push(checkbox.value);
      }
    }

    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify({
        distance: Number(distance.value),
        categories: selected
      }));
      status.textContent = 'Preferências salvas.';
    }
    catch {
      status.textContent = 'Não foi possível salvar as preferências neste navegador.';
    }
  });
}
