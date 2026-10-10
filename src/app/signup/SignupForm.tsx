"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        const errorMessage =
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।";

        setMessage(errorMessage);
        toast.error(errorMessage);
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      window.location.href = "/sign-in";
    } catch {
      const errorMessage = "সমস্যা হয়েছে। আবার চেষ্টা করো।";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    setMessage("");
    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        const errorMessage =
          error.message || "Google দিয়ে চালিয়ে যাওয়া যায়নি।";

        setMessage(errorMessage);
        toast.error(errorMessage);
        setGoogleLoading(false);
      }
    } catch {
      const errorMessage = "Google দিয়ে চালিয়ে যাওয়া যায়নি।";
      setMessage(errorMessage);
      toast.error(errorMessage);
      setGoogleLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্ট খুলুন।
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="signup-name"
              className="mb-1 block text-sm font-medium"
            >
              আপনার নাম
            </label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="আপনার নাম লিখুন"
              className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-1 block text-sm font-medium"
            >
              ইমেইল
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="আপনার ইমেইল লিখুন"
              className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-1 block text-sm font-medium"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading || googleLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          {googleLoading ? (
  "Google-এর সঙ্গে সংযোগ হচ্ছে..."
) : (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.05 13.22l7.98 6.19C12.92 13.72 18.05 9.5 24 9.5Z"
        transform="translate(0 4)"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.64 5.93c4.46-4.13 7.14-10.2 7.14-17.58Z"
      />
      <path
        fill="#FBBC05"
        d="M10.03 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
        transform="translate(0 0)"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.9-5.87l-7.64-5.93c-2.13 1.43-4.84 2.3-8.26 2.3-5.95 0-11.08-4.02-12.97-9.44l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
      />
    </svg>
    <span>Google দিয়ে চালিয়ে যান</span>
  </>
)}
        </button>

       

        <p className="mt-6 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-green-700 hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}