import { useState } from 'react';

export default function FavoriteButton({ place, saved, onFavorite }) {
  const [status, setStatus] = useState('');

  function toggleFavorite() {
    setStatus(onFavorite(place.id));
  }

  return (
    <>
      <button
        type="button"
        data-favorite={place.id}
        onClick={toggleFavorite}
        className={`mt-4 rounded-lg border border-bora px-4 py-2 font-bold ${saved ? 'bg-bora text-white' : ''}`}
      >
        {saved ? 'Remover dos favoritos' : 'Favoritar'}
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </>
  );
}
