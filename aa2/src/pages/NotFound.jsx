import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 p-4">
      <h1 className="my-4 text-3xl font-bold">Página não encontrada</h1>
      <Link to="/" className="text-bora underline">Voltar para a Home</Link>
    </main>
  );
}
