import { Link } from 'react-router-dom';
import PlaceCard from '../components/PlaceCard';

export default function Favorites({ places, coordinates, favorites, onFavorite }) {
  const selected = favorites.map(id => places.find(place => place.id === id)).filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 p-4">
      <section className="my-6 rounded-lg bg-bora-light p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-bora sm:text-3xl">Favoritos</h1>
        <p className="mt-3">Os lugares que você guardou para visitar depois.</p>
      </section>
      <p id="favorite-count" className="my-4 text-sm">
        {selected.length} {selected.length === 1 ? 'lugar salvo' : 'lugares salvos'}
      </p>
      <div id="favorites-list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selected.map(place => (
          <PlaceCard key={place.id} place={place} coordinates={coordinates} saved={true} onFavorite={onFavorite} />
        ))}
      </div>
      {selected.length === 0 && (
        <section id="empty-favorites" className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-xl font-bold">{favorites.length > 0 ? 'Lugares salvos indisponíveis' : 'Nenhum lugar salvo ainda'}</h2>
          <p className="my-2">
            {favorites.length > 0
              ? 'Os lugares salvos não estão no catálogo. Seus favoritos foram mantidos.'
              : 'Encontrou um lugar interessante? Toque em Favoritar para guardar aqui.'}
          </p>
          <Link to="/" className="text-bora underline">Ver lugares</Link>
        </section>
      )}
    </main>
  );
}
