"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-lg px-4 py-12 text-center">
        <p className="mb-4 text-gray-600">
          তথ্য আপডেট করতে আগে লগইন করুন।
        </p>
        <Link
          href="/sign-in"
          className="font-semibold text-green-700 hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
         তথ্য আপডেট করুন
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          আপনার নাম পরিবর্তন করুন।
        </p>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={1}
              placeholder="আপনার নতুন নাম লিখুন"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
          </button>
        </form>

        <Link
          href="/profile"
          className="mt-5 block text-center text-sm font-medium text-green-700 hover:underline"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </main>
  );
}