import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { places } from '../data/places';
import { distanceTo, formatDistance } from '../location';
import Rating, { stars } from '../components/Rating';
import FavoriteButton from '../components/FavoriteButton';

export default function Details({ coordinates, favorites, onFavorite }) {
  const { id } = useParams();
  const place = places.find(place => place.id === id);

  useEffect(() => {
    document.title = place ? `${place.name} - Bora` : 'Lugar não encontrado - Bora';
  }, [place]);

  return (
    <main id="place-detail" className="mx-auto w-full max-w-6xl flex-1 p-4">
      <Link to="/" className="my-4 inline-block text-bora underline">Voltar para descobrir</Link>
      {place ? (
        <article data-place={place.id}>
          <section className="grid gap-6 md:grid-cols-2">
            <img className="w-full self-start rounded-lg" src={place.image} alt={place.imageAlt} />
            <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
              <p className="text-bora">{place.category}</p>
              <h1 className="my-2 text-2xl font-bold sm:text-3xl">{place.name}</h1>
              <Rating place={place} />
              <p className="my-4">{place.description}</p>
              <ul className="my-4 space-y-2 rounded-lg bg-stone-50 p-4">
                <li>
                  <strong>Distância:</strong> {formatDistance(distanceTo(place, coordinates))}
                </li>
                <li>
                  <strong>Preço:</strong> {place.price}
                </li>
                <li>
                  <strong>Tempo sugerido:</strong> {place.duration}
                </li>
              </ul>
              <FavoriteButton place={place} saved={favorites.includes(place.id)} onFavorite={onFavorite} />
              <h2 className="mt-6 text-xl font-bold">Informações</h2>
              <p className="mt-2"><strong>Endereço:</strong> {place.address}</p>
              <p className="mt-2"><strong>Horário:</strong> {place.hours}</p>
            </div>
          </section>

          <section className="mt-8 rounded-lg bg-bora-light p-4 sm:p-6">
            <h2 className="text-2xl font-bold">Avaliações</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {place.reviews.map(review => (
                <article key={review.author} className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="font-bold">{review.author}</h3>
                  <p className="my-2"><span className="text-orange-700">{stars(review.rating)}</span> {review.rating}/5</p>
                  <p>{review.comment}</p>
                  {review.photo && (
                    <figure className="mt-4">
                      <img src={review.photo} alt={review.photoAlt} className="h-24 w-40 rounded object-cover" />
                    </figure>
                  )}
                </article>
              ))}
            </div>
          </section>
        </article>
      ) : (
        <section id="place-not-found">
          <h1 className="my-4 text-3xl font-bold">Lugar não encontrado</h1>
          <Link to="/" className="text-bora underline">Voltar para a Home</Link>
        </section>
      )}
    </main>
  );
}
