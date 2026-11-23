import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();

  function activeClass(path) {
    return pathname === path ? 'bg-bora-light font-bold' : '';
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="relative mx-auto max-w-6xl p-4 md:flex md:items-center md:justify-between">
        <Link to="/" className="inline-block text-3xl font-bold text-bora">Bora</Link>
        <nav className="responsive-navbar text-sm text-bora">
          <label id="label-dropdown-navbar-menu" htmlFor="checkbox-dropdown-navbar-menu">
            <svg className="navbar-menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <title>Menu</title>
              <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
            </svg>
          </label>
          <input type="checkbox" id="checkbox-dropdown-navbar-menu" />
          <ul className="gap-2">
            <li>
              <Link to="/" className={activeClass('/')}>Descobrir</Link>
            </li>
            <li>
              <Link to="/mapa" className={activeClass('/mapa')}>Mapa</Link>
            </li>
            <li>
              <Link to="/favoritos" className={activeClass('/favoritos')}>Favoritos</Link>
            </li>
            <li>
              <Link to="/preferencias" className={activeClass('/preferencias')}>Preferências</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
