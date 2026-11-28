import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import RequestStatus from './components/RequestStatus';
import Footer from './components/Footer';
import Home from './pages/Home';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import Map from './pages/Map';
import Preferences from './pages/Preferences';
import NotFound from './pages/NotFound';
import { getLocation } from './location';
import { FAVORITES_KEY, THEME_KEY, getFavorites, getDarkMode } from './storage';

export default function App() {
  const [favorites, setFavorites] = useState(getFavorites);
  const [coordinates, setCoordinates] = useState(getLocation);
  const [darkMode, setDarkMode] = useState(getDarkMode);
  const { pathname, key } = useLocation();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPlaces() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('/api/lugares', { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Não foi possível buscar os lugares. Tente novamente.');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('O servidor não retornou uma lista de lugares.');
        }
        if (!controller.signal.aborted) {
          setPlaces(data);
        }
      }
      catch {
        if (!controller.signal.aborted) {
          setError('Não foi possível buscar os lugares. Tente novamente.');
        }
      }
      finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPlaces();
    return () => controller.abort();
  }, [attempt]);

  function retryPlaces() {
    setLoading(true);
    setError('');
    setAttempt(previous => previous + 1);
  }

  const catalogStatus = loading || error
    ? <RequestStatus loading={loading} error={error} onRetry={retryPlaces} />
    : null;

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const titles = {
      '/': 'Descobrir',
      '/favoritos': 'Favoritos',
      '/mapa': 'Mapa',
      '/preferencias': 'Preferências'
    };
    if (!pathname.startsWith('/detalhes/')) {
      document.title = `${titles[pathname] || 'Página não encontrada'} - Bora`;
    }
  }, [pathname]);

  useEffect(() => {
    function updateSavedFavorites(event) {
      if (event.key === FAVORITES_KEY || event.key === null) {
        setFavorites(getFavorites());
      }
    }

    window.addEventListener('storage', updateSavedFavorites);
    return () => window.removeEventListener('storage', updateSavedFavorites);
  }, []);

  function toggleFavorite(id) {
    const saved = getFavorites();
    let next;

    if (saved.includes(id)) {
      next = saved.filter(favorite => favorite !== id);
    }
    else {
      next = [...saved, id];
    }

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      setFavorites(next);
      return '';
    }
    catch {
      setFavorites(saved);
      return 'Não foi possível salvar os favoritos neste navegador.';
    }
  }

  const updateLocation = useCallback(position => {
    const next = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    setCoordinates(next);

    try {
      sessionStorage.setItem('bora-localizacao', JSON.stringify(next));
    }
    catch {
      // a localização continua disponível na aplicação se o armazenamento estiver bloqueado
    }
  }, []);

  function changeTheme(enabled) {
    setDarkMode(enabled);
    try {
      localStorage.setItem(THEME_KEY, enabled ? 'escuro' : 'claro');
      return '';
    }
    catch {
      return 'O tema foi aplicado, mas não foi possível salvar a escolha neste navegador.';
    }
  }

  return (
    <>
      <Header key={key} />
      <Routes>
        <Route
          path="/"
          element={catalogStatus || (
            <Home
              places={places}
              coordinates={coordinates}
              onLocation={updateLocation}
              favorites={favorites}
              onFavorite={toggleFavorite}
            />
          )}
        />
        <Route
          path="/detalhes/:id"
          element={
            <Details
              coordinates={coordinates}
              favorites={favorites}
              onFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/favoritos"
          element={catalogStatus || (
            <Favorites
              places={places}
              coordinates={coordinates}
              favorites={favorites}
              onFavorite={toggleFavorite}
            />
          )}
        />
        <Route
          path="/mapa"
          element={catalogStatus || <Map places={places} coordinates={coordinates} onLocation={updateLocation} />}
        />
        <Route
          path="/preferencias"
          element={<Preferences darkMode={darkMode} onTheme={changeTheme} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
