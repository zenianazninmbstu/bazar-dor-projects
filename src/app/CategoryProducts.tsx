
"use client";

import { useMemo, useState } from "react";
import ProductCard from "./components/ProductCard";
import Link from "next/link";

type Product = {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type Props = {
  products: Product[];
};

export default function CategoryProducts({ products }: Props) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sort === "high") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section className="mt-5">
      <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-600">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          সাজানো
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-2 py-2"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">কম থেকে বেশি</option>
            <option value="high">বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

     
{products.length === 0 && (
  <div className="py-10 text-center">
    <p className="text-gray-500">
      এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
    </p>

    <Link
      href="/"
      className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
    >
      হোম পেজে ফিরে যান
    </Link>
  </div>
)}

    </section>
  );
}