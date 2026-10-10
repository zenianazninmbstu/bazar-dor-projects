
"use client";

import { useMemo, useState } from "react";
import ProductCard from "./components/ProductCard";

type Product = {
  id: number;
  nameBn: string;
  image: string;
  today: number | string;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type SortableProductsProps = {
  products: Product[];
};

// বাংলা ও ইংরেজি সংখ্যা—দুটোকেই numeric value-তে রূপান্তর করে
function parsePrice(value: number | string): number {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  const normalized = String(value)
    .replace(/[০-৯]/g, (digit) =>
      String(bengaliDigits.indexOf(digit))
    )
    .replace(/,/g, "")
    .replace(/٫/g, ".");

  const price = Number(normalized);
  return Number.isFinite(price) ? price : 0;
}

export default function SortableProducts({
  products,
}: SortableProductsProps) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    if (sortOrder === "default") {
      return products;
    }

    return products
      .map((product, index) => ({ product, index }))
      .sort((a, b) => {
        const priceDifference =
          parsePrice(a.product.today) - parsePrice(b.product.today);

        const result =
          sortOrder === "low-to-high"
            ? priceDifference
            : -priceDifference;

        return result || a.index - b.index;
      })
      .map(({ product }) => product);
  }, [products, sortOrder]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="product-sort"
            className="text-sm font-medium text-gray-700"
          >
            সাজান
          </label>

          <div className="relative">
            <select
              id="product-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>

            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="m5 7.5 5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
