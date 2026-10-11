
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      setMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-[80%] items-center justify-between gap-4">
        {/* Logo and Website Name */}
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
            
<p className="text-xs text-gray-500">
  {new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</p>

          </div>
        </Link>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-2 w-10 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ) : session?.user ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label="User menu"
                className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-50"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                    {(session.user.name || session.user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

                <span className="max-w-28 truncate text-sm font-medium text-gray-800">
                  {(session.user.name || "User").split(" ")[0]}
                </span>

                <span className="text-xs text-gray-500">⌄</span>
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">
                  {/* User Information */}
                  <div className="border-b border-gray-100 px-3 py-2">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {session.user.name || "ব্যবহারকারী"}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {session.user.email}
                    </p>
                  </div>

                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="mt-1 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    👤 আমার প্রোফাইল
                  </Link>

                  {/* Sign Out */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                  >
                    ↩ সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Sign In */}
              <Link
                href="/sign-in"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
              >
                সাইন ইন
              </Link>

              {/* Sign Up */}
              <Link
                href="/signup"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

