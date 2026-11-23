import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
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
          element={
            <Home
              coordinates={coordinates}
              onLocation={updateLocation}
              favorites={favorites}
              onFavorite={toggleFavorite}
            />
          }
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
          element={
            <Favorites
              coordinates={coordinates}
              favorites={favorites}
              onFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/mapa"
          element={<Map coordinates={coordinates} onLocation={updateLocation} />}
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
