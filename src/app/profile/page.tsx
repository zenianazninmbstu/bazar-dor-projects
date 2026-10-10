"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;
  const initial = user?.name?.trim().charAt(0).toUpperCase() || "U";

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        alert("Sign out করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      router.push("/sign-in");
      router.refresh();
    } catch {
      alert("একটি সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-7 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        
<section className="mb-5 mt-7">
          <h2 className="text-xl font-bold text-gray-800">
            আমার প্রোফাইল
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও আপডেট করুন।
          </p>
        </section>
        {isPending && (
          <p className="mb-4 text-sm text-gray-600">
            প্রোফাইল লোড হচ্ছে...
          </p>
        )}

        <section className="relative flex min-h-32 items-start gap-4 rounded-2xl border border-[#e1e9e1] bg-white p-5 pr-40 shadow-sm">

 
<div className="flex min-w-0 items-center gap-4">
  <img
    src={user?.image || "https://i.pravatar.cc/160?img=12"}
    alt="Demo profile photo"
    className="h-20 w-20 shrink-0 rounded-full border border-gray-200 object-cover"
  />

  <div className="min-w-0">
    <h2 className="break-words text-lg font-bold text-gray-800">
      {user?.name || "Rezwan Ahmed"}
    </h2>

    <p className="mt-1 break-all text-sm text-gray-500">
      {user?.email || "rezwanahmed@gmail.com"}
    </p>
  </div>
</div>


<button
  type="button"
  onClick={handleSignOut}
  disabled={isSigningOut || !user}
  className="absolute right-5 top-1/2 -translate-y-1/2 rounded-lg border border-red-300 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isSigningOut ? "সাইন আউট..." : "↩ সাইন আউট"}
</button>

          
       
 </section>

    <section className="rounded-2xl border border-[#e1e9e1] bg-white p-5 shadow-sm sm:p-6 mt-4">
          <h2 className="border-b border-gray-100 pb-4 text-lg font-bold text-gray-800">
            তথ্য
          </h2>

          <div className="pt-5">
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>
            <input
              id="profile-name"
              type="text"
              value={user?.name || ""}
              placeholder="নাম যোগ করা হয়নি"
              readOnly
              className="w-full rounded-lg border border-[#e1e9e1] bg-[#fbfdfb] px-4 py-3 text-sm text-gray-800 outline-none"
            />

            <label
              htmlFor="profile-email"
              className="mb-2 mt-5 block text-sm font-medium text-gray-700"
            >
              ইমেইল
            </label>
            <input
              id="profile-email"
              type="email"
             value={user?.email || ""}
              placeholder="ইমেইল যোগ করা হয়নি"
              readOnly
              className="w-full rounded-lg border border-[#e1e9e1] bg-[#fbfdfb] px-4 py-3 text-sm text-gray-800 outline-none"
            />

            <Link
              href="/profile/update"
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              আপডেট ইনফরমেশন
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}