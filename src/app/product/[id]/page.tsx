import { notFound } from "next/navigation";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

type Props = {
  params: Promise<{ id: string }>;
};

function getUnitBn(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    l: "লিটার",
    piece: "পিস",
    pcs: "পিস",
  };

  return units[unit.toLowerCase()] ?? unit;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
     `https://openapi.programming-hero.com/api/bazardor/products/${id}`
  );

 if (!res.ok) {
  notFound();
}

  const product: Product = await res.json();

  const lowestPrice = Math.min(...product.markets.map((market) => market.min));

const highestPrice = Math.max(...product.markets.map((market) => market.max));

const averagePrice = Math.round(
  product.markets.reduce(
    (total, market) => total + (market.min + market.max) / 2,
    0
  ) / product.markets.length
);

  return (
    <main className="mx-auto min-h-screen w-[90%] max-w-4xl py-10">
      <nav className="mb-6 text-sm text-gray-500">
  <a href="/" className="hover:text-green-700">হোম</a>
  <span className="mx-2">&gt;</span>
  <a
    href={`/category/${product.category}`}
    className="hover:text-green-700"
  >
    {product.categoryNameBn}
  </a>
  <span className="mx-2">&gt;</span>
  <span className="font-medium text-gray-800">
    {product.nameBn}
  </span>
</nav>


<div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-[#e3e9e3] bg-white p-4 sm:p-6">
  <div className="flex min-w-0 items-center gap-3">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3f6f3] text-2xl">
      {product.image}
    </div>

    <div className="min-w-0">
      <h1 className="text-lg font-bold text-[#263329] sm:text-2xl">
        {product.nameBn}
      </h1>
      <p className="mt-1 text-xs text-gray-500">
        {product.categoryNameBn} · প্রতি কেজি
      </p>

<p className="mt-1 text-xs text-gray-600">
  গতকালের তুলনায় আজ দাম{" "}
  <span className={`font-semibold ${product.change.dir === "up" ? "text-red-600" : product.change.dir === "down" ? "text-green-600" : "text-gray-600"}`}>
    {product.change.dir === "up"
      ? "বেড়েছে"
      : product.change.dir === "down"
      ? "কমেছে"
      : "অপরিবর্তিত"}
  </span>
  {product.change.dir !== "flat" && (
    <>
      {" · "}
      {Math.abs(product.today - product.yesterday).toLocaleString("bn-BD")} টাকা
    </>
  )}
</p>
    </div>
  </div>

  <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-3 py-3 text-center sm:min-w-20 sm:px-4">
    <p className="text-xs text-gray-500">আজকের দাম</p>
    <p className="text-2xl font-bold text-[#263329]">
      {product.today.toLocaleString("bn-BD")}
    </p>
    <p className="text-xs text-gray-500">টাকা / কেজি</p>
    <p className={`mt-1 text-xs font-semibold ${product.change.dir === "up" ? "text-red-600" : product.change.dir === "down" ? "text-green-600" : "text-gray-500"}`}>
      {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"} {product.change.pct.toLocaleString("bn-BD")}%
    </p>
  </div>
</div>

    <h2 className="mb-4 text-xl font-bold text-gray-800">
  দামের সারসংক্ষেপ
</h2>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-5xl">{product.image}</div>

        <h1 className="mt-4 text-3xl font-bold">{product.nameBn}</h1>

        <p className="mt-2 text-gray-500">
  প্রতি {getUnitBn(product.unit)}
</p>

        

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
  <div className="rounded-xl border border-gray-200 p-4">
    <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>


   <div>
  <p className="mt-2 text-xl font-bold text-green-700">
    {lowestPrice.toLocaleString("bn-BD")} টাকা
  </p>
  <p className="mt-2 text-sm text-gray-500">
    সবচেয়ে কম দামের বাজার
  </p>
</div>
    
  </div>

  <div className="rounded-xl border border-gray-200 p-4">
    <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
    <p className="mt-2 text-xl font-bold text-red-600">
      {highestPrice.toLocaleString("bn-BD")} টাকা
    </p>

    <p className="mt-2 text-sm text-gray-500">
  সবচেয়ে বেশি দামের বাজার
</p>
  </div>

  <div className="rounded-xl border border-gray-200 p-4">
    <p className="text-sm text-gray-500">গড় দাম</p>
    <p className="mt-2 text-xl font-bold text-gray-900">
      {averagePrice.toLocaleString("bn-BD")} টাকা
    </p>

 <p className="mt-2 text-sm text-gray-500">
  প্রতি {getUnitBn(product.unit)} হিসাবে
</p>
  </div>
</div>
      </div>



<div className="mt-10 rounded-2xl border border-[#e2e9e2] bg-[#f7faf7] p-4 sm:p-5">
  <h2 className="mb-5 text-xl font-bold text-[#263329]">
    বাজারভিত্তিক আজকের দাম
  </h2>

  <div className="overflow-x-auto rounded-xl border border-[#e1e7e1]">
    <table className="w-full min-w-[650px] border-collapse text-sm">
      <thead className="bg-[#f0f5f0] text-gray-600">
        <tr>
          <th className="px-4 py-4 text-left font-semibold">বাজার</th>
          <th className="px-4 py-4 text-left font-semibold">বিভাগ</th>
          <th className="px-4 py-4 text-right font-semibold">সর্বনিম্ন</th>
          <th className="px-4 py-4 text-right font-semibold">সর্বাধিক</th>
          <th className="px-4 py-4 text-right font-semibold">গড়</th>
        </tr>
      </thead>

      <tbody>
        {product.markets.map((market, index) => {
          const marketAverage = Math.round(
            (market.min + market.max) / 2
          );

          return (
            <tr
              key={`${market.market}-${index}`}
              className={`border-t border-[#e1e7e1] ${
                index % 2 === 0 ? "bg-white" : "bg-[#f3f7f3]"
              }`}
            >
              <td className="px-4 py-4 font-medium text-[#263329]">
                {market.market}
              </td>
              <td className="px-4 py-4 text-gray-600">
                {market.division}
              </td>
              <td className="px-4 py-4 text-right text-gray-700">
                {market.min.toLocaleString("bn-BD")} টাকা
              </td>
              <td className="px-4 py-4 text-right text-gray-700">
                {market.max.toLocaleString("bn-BD")} টাকা
              </td>
              <td className="px-4 py-4 text-right font-semibold text-[#263329]">
                {marketAverage.toLocaleString("bn-BD")} টাকা
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
    </main>
  );
}