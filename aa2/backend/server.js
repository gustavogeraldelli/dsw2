import express from 'express';
import { readFile } from 'node:fs/promises';

const app = express();
const port = 3001;
const dataFile = new URL('./dados.json', import.meta.url);

async function getPlaces() {
  const content = await readFile(dataFile, 'utf8');
  const places = JSON.parse(content);

  return places.map(place => {
    const reviewCount = place.reviews.length;
    const sum = place.reviews.reduce((total, review) => total + review.rating, 0);
    const rating = reviewCount > 0 ? Math.round(sum / reviewCount * 10) / 10 : 0;
    return { ...place, rating, reviewCount };
  });
}

app.get('/api/lugares', async (request, response) => {
  try {
    const places = await getPlaces();
    response.json(places);
  }
  catch (error) {
    console.error('Erro ao ler o catálogo:', error.message);
    response.status(500).json({ message: 'Não foi possível carregar os lugares.' });
  }
});

app.get('/api/lugares/:id', async (request, response) => {
  try {
    const places = await getPlaces();
    const place = places.find(place => place.id === request.params.id);

    if (!place) {
      response.status(404).json({ message: 'Lugar não encontrado.' });
      return;
    }

    response.json(place);
  }
  catch (error) {
    console.error('Erro ao ler o lugar:', error.message);
    response.status(500).json({ message: 'Não foi possível carregar o lugar.' });
  }
});

app.use('/api', (request, response) => {
  response.status(404).json({ message: 'Rota não encontrada.' });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Backend disponível em http://127.0.0.1:${port}`);
});
