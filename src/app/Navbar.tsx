
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-[80%] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="my-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600">
            <img
              src="/logo-icon.png"
              alt="বাজার দর"
              className="h-8 w-8"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold">বাজার দর</h1>
            <p className="text-xs">বাজারের সর্বশেষ দাম</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
    </header>
  );
}