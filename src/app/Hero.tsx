
"use client";

import { useEffect, useState } from "react";


export default function Hero() {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      setFormattedDate(
        new Date().toLocaleDateString("bn-BD", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateDate();

    const interval = setInterval(updateDate, 60_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto mt-6 w-full max-w-6xl rounded-3xl border border-gray-200 bg-white p-4 sm:p-6">
     <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1">
          <p className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {formattedDate || "তারিখ লোড হচ্ছে..."}
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-6 text-xs leading-6 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
<a
  href="#সব-পণ্য"
  className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
>
  সব পণ্য দেখুন
</a>
        </div>

      
<div className="flex w-full flex-1 justify-center md:justify-end">
  <img
    src="/bazar-hero.png"
    alt="বাজার দর"
    className="h-auto w-3/4 max-w-xs object-contain md:w-[40%]"
  />
</div>

      </div>
    </section>
  );
}
