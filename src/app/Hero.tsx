export default function Hero() {
  return (
    <section className="mx-auto mt-6 w-[80%] rounded-3xl border border-gray-200 bg-white p-4">
  <div className="flex items-center justify-between gap-8">
    
    <div className="flex-1">
        <p className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
          বুধবার, ৮ অক্টোবর, ২০২৬
        </p>
        

        <h2 className="mt-4 text-4xl font-bold">
          আজকের বাজারের দাম এক নজরে
        </h2>

        <p className="mt-6 text-xs leading-6 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
          বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-<br/>সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <button className="mt-6 rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white">
          সব পণ্য দেখুন
        </button>


       </div>

            <div className="flex-1 flex justify-end">
  <img
    src="/bazar-hero.png"
    alt="বাজার দর"
    className="w-[40%] h-auto object-contain"
  />
</div>
      </div>

    </section>
  );
}