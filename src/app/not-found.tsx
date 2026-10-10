
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-green-600">404</p>

      <h1 className="mt-4 text-2xl font-bold text-gray-800">
        দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mt-3 text-sm text-gray-600">
        আপনি যে পেজটি খুঁজছেন, সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}

