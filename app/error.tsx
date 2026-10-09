
"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold">
          Unable to load prayer times
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          We couldn't retrieve the prayer times.
          Please check your internet connection and try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
        >
          Try again
        </button>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-4 break-words text-left text-xs text-red-600">
            {error.message}
          </p>
        )}
      </div>
    </main>
  );
}
