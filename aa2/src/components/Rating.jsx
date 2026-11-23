export function stars(rating) {
  const rounded = Math.round(rating);
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

export default function Rating({ place }) {
  return (
    <p className="text-sm">
      <span className="text-orange-700">{stars(place.rating)}</span>
      {' '}{place.rating.toFixed(1).replace('.', ',')}/5 · {place.reviewCount} avaliações
    </p>
  );
}
