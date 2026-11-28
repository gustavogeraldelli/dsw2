export default function RequestStatus({ loading, error, onRetry }) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 p-4">
      <section className="my-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-bora">
          {loading ? 'Carregando lugares...' : 'Não foi possível carregar'}
        </h1>
        {error && (
          <>
            <p className="my-4">{error}</p>
            <button type="button" onClick={onRetry} className="rounded-lg bg-bora px-4 py-2 font-bold text-white">
              Tentar novamente
            </button>
          </>
        )}
      </section>
    </main>
  );
}
