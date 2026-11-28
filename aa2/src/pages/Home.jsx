import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_LOCATION, distanceTo, locationWasRequested } from '../location';
import { getPreferences } from '../storage';
import PlaceCard from '../components/PlaceCard';

export default function Home({ places, coordinates, onLocation, favorites, onFavorite }) {
  const [preferences] = useState(getPreferences);
  const [filters, setFilters] = useState(() => {
    let category = 'all';

    if (preferences.categories.length === 1) {
      category = preferences.categories[0];
    }
    else if (preferences.categories.length > 1) {
      category = 'preferred';
    }

    return {
      category,
      distance: preferences.distance,
      price: 999
    };
  });
  const [status, setStatus] = useState('');
  const [locating, setLocating] = useState(false);
  const automaticRequest = useRef(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('Este navegador não oferece geolocalização.');
      return;
    }

    try {
      sessionStorage.setItem('bora-localizacao-solicitada', 'true');
    }
    catch {
      // a solicitação funciona mesmo se o armazenamento estiver bloqueado
    }

    setLocating(true);
    setStatus('Buscando sua localização...');
    navigator.geolocation.getCurrentPosition(position => {
      onLocation(position);
      setStatus('');
      setLocating(false);
    }, error => {
      setLocating(false);
      setStatus(error.code === 1
        ? 'Para usar sua localização, permita o acesso nas configurações do navegador.'
        : 'Não foi possível obter sua localização. Mostrando sugestões em São Carlos.');
    }, { timeout: 10000 });
  }, [onLocation]);

  useEffect(() => {
    if (coordinates === DEFAULT_LOCATION && !automaticRequest.current &&
        !locationWasRequested() && navigator.geolocation) {
      automaticRequest.current = true;
      requestLocation();
    }
  }, [coordinates, requestLocation]);

  const visiblePlaces = places
    .filter(place => {
      const category = filters.category;
      return (category === 'all' || category === place.category ||
        (category === 'preferred' && preferences.categories.includes(place.category))) &&
        distanceTo(place, coordinates) <= filters.distance && place.priceValue <= filters.price;
    })
    .sort((first, second) => distanceTo(first, coordinates) - distanceTo(second, coordinates));

  return (
    <main className="flex-1">
      <section className="bg-bora-light py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold text-bora sm:text-4xl">O que fazer hoje?</h1>
          <p className="mt-3 text-gray-600">Escolha os filtros para ver algumas sugestões de passeio.</p>
          <div id="filters" className="mt-6 grid gap-4 rounded-lg bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-sm font-bold" htmlFor="category">Categoria</label>
              <select id="category" value={filters.category} onChange={event => setFilters({ ...filters, category: event.target.value })}>
                <option value="all">Todas</option>
                {preferences.categories.length > 1 && <option value="preferred">Categorias favoritas</option>}
                <option>Ao ar livre</option>
                <option>Comer</option>
                <option>Cultura</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold" htmlFor="distance">Distância</label>
              <select id="distance" value={filters.distance} onChange={event => setFilters({ ...filters, distance: Number(event.target.value) })}>
                <option value="5">Até 5 km</option>
                <option value="10">Até 10 km</option>
                <option value="20">Até 20 km</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold" htmlFor="price">Preço</label>
              <select id="price" value={filters.price} onChange={event => setFilters({ ...filters, price: Number(event.target.value) })}>
                <option value="999">Qualquer valor</option>
                <option value="0">Grátis</option>
                <option value="50">Até R$ 50</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="distance-reference" className="text-2xl font-bold">
            {coordinates === DEFAULT_LOCATION ? 'Sugestões em São Carlos' : 'Perto de você'}
          </h2>
          {coordinates === DEFAULT_LOCATION && (
            <button id="use-location" type="button" onClick={requestLocation} disabled={locating} className="mt-3 rounded-lg bg-bora px-4 py-2 font-bold text-white">
              Usar minha localização
            </button>
          )}
          <p id="location-status" className="mt-2 text-sm">{status}</p>
          <p id="result-count" className="mt-2 mb-4 text-sm">
            {visiblePlaces.length} {visiblePlaces.length === 1 ? 'lugar' : 'lugares'}
          </p>
          <div id="places-list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePlaces.map(place => (
              <PlaceCard key={place.id} place={place} coordinates={coordinates} saved={favorites.includes(place.id)} onFavorite={onFavorite} />
            ))}
          </div>
          {visiblePlaces.length === 0 && (
            <p id="no-results">Nenhum lugar corresponde a esses filtros. Tente outra combinação.</p>
          )}
        </div>
      </section>
    </main>
  );
}
