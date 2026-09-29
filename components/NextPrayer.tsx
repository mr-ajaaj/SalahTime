export default function NextPrayer() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Tangier, Morocco
          </p>

          <h1 className="mt-2 text-2xl font-semibold">
            Monday, September 29, 2026
          </h1>
        </div>

        <div className="rounded-2xl border p-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider">
            Next Prayer
          </p>

          <h2 className="mt-4 text-4xl font-semibold">
            Maghrib
          </h2>

          <p className="mt-2 text-3xl">
            19:21
          </p>

          <p className="mt-6 text-sm text-gray-500">
            01:42:18 remaining
          </p>
        </div>
      </div>
    </section>
  );
}