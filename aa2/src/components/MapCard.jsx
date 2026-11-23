import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function MapCard({ place }) {
  return (
    <article className="map-card w-56 overflow-hidden rounded-lg bg-white text-gray-800">
      <img src={place.image} alt={place.imageAlt} className="h-24 w-full object-cover" />
      <div className="flex flex-col gap-2 p-3">
        <p className="self-start rounded bg-bora-light px-2 py-1 text-xs font-bold text-bora">{place.category}</p>
        <h2 className="text-lg font-bold">{place.name}</h2>
        <Rating place={place} />
        <p className="text-sm text-gray-600">{place.summary}</p>
        <p className="text-sm font-bold">{place.price} · {place.duration}</p>
        <Link to={`/detalhes/${place.id}`} className="underline">Ver detalhes</Link>
      </div>
    </article>
  );
}
