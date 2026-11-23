import { useState } from 'react';
import { getPreferences, PREFERENCES_KEY } from '../storage';

export default function Preferences({ darkMode, onTheme }) {
  const [preferences, setPreferences] = useState(getPreferences);
  const [status, setStatus] = useState('');
  const [themeStatus, setThemeStatus] = useState('');

  function changeDistance(event) {
    setPreferences({ ...preferences, distance: Number(event.target.value) });
    setStatus('');
  }

  function changeCategory(event) {
    const category = event.target.value;
    const categories = event.target.checked
      ? [...preferences.categories, category]
      : preferences.categories.filter(saved => saved !== category);
    setPreferences({ ...preferences, categories });
    setStatus('');
  }

  function savePreferences(event) {
    event.preventDefault();
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
      setStatus('Preferências salvas.');
    }
    catch {
      setStatus('Não foi possível salvar as preferências neste navegador.');
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-4">
      <section className="my-6 rounded-lg bg-bora-light p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-bora sm:text-3xl">Preferências</h1>
        <p className="mt-3">Escolha as categorias de passeio e a distância que você prefere.</p>
      </section>
      <form id="preferences-form" onSubmit={savePreferences} className="rounded-lg border border-gray-200 bg-white p-4">
        <label htmlFor="preferred-distance">Distância máxima</label>
        <select id="preferred-distance" value={preferences.distance} onChange={changeDistance}>
          <option value="5">5 km</option>
          <option value="10">10 km</option>
          <option value="20">20 km</option>
        </select>
        <fieldset className="my-4">
          <legend className="font-bold">Categorias favoritas</legend>
          <label className="mt-2 block">
            <input type="checkbox" name="category" value="Ao ar livre" checked={preferences.categories.includes('Ao ar livre')} onChange={changeCategory} /> Ao ar livre
          </label>
          <label className="mt-2 block">
            <input type="checkbox" name="category" value="Cultura" checked={preferences.categories.includes('Cultura')} onChange={changeCategory} /> Cultura
          </label>
          <label className="mt-2 block">
            <input type="checkbox" name="category" value="Comer" checked={preferences.categories.includes('Comer')} onChange={changeCategory} /> Comida
          </label>
        </fieldset>
        <button type="submit" className="rounded-lg bg-bora px-4 py-2 font-bold text-white">Salvar</button>
        <p id="preferences-status" className="mt-3 text-sm">{status}</p>
      </form>
      <section className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="mb-3 text-lg font-bold">Aparência</h2>
        <label htmlFor="dark-mode">
          <input type="checkbox" id="dark-mode" checked={darkMode} onChange={event => setThemeStatus(onTheme(event.target.checked))} /> Modo escuro
        </label>
        <p className="mt-2 text-sm">A escolha é salva automaticamente.</p>
        <p id="theme-status" className="mt-3 text-sm">{themeStatus}</p>
      </section>
    </main>
  );
}
