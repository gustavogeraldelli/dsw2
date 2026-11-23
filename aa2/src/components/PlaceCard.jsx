import { Link } from 'react-router-dom';
import { distanceTo, formatDistance } from '../location';
import Rating from './Rating';
import FavoriteButton from './FavoriteButton';

export default function PlaceCard({ place, coordinates, saved, onFavorite }) {
  return (
    <article data-place-id={place.id} className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <Link to={`/detalhes/${place.id}`}>
        <img src={place.image} alt={place.imageAlt} className="h-48 w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="self-start rounded bg-bora-light px-2 py-1 text-xs font-bold text-bora">{place.category}</p>
        <h3 className="my-2 text-xl font-bold">{place.name}</h3>
        <Rating place={place} />
        <p className="my-3 text-gray-600">{place.summary}</p>
        <p className="mb-4 text-sm font-bold">
          {formatDistance(distanceTo(place, coordinates))} · {place.price} · {place.duration}
        </p>
        <Link to={`/detalhes/${place.id}`} className="mt-auto pt-2 text-bora underline">Ver detalhes</Link>
        <FavoriteButton place={place} saved={saved} onFavorite={onFavorite} />
      </div>
    </article>
  );
}
