import Link from "next/link";



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

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
  href={`/product/${product.id}`}
 className="block rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-4"
>
      <div className="mb-3 text-3xl">{product.image}</div>

      <h3 className="font-bold text-gray-800">
        {product.nameBn}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
  প্রতি {
    product.unit === "kg" ? "কেজি" :
    product.unit === "litre" ? "লিটার" :
    product.unit === "liter" ? "লিটার" :
    product.unit === "dozen" ? "ডজন" :
    product.unit === "piece" ? "টি" :
    product.unit
  }
</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="font-bold text-gray-900">
           {Number(product.today).toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
  className={`text-sm font-semibold ${
   product.change.dir === "up" ? "text-red-600" :
product.change.dir === "down" ? "text-green-600" : "text-gray-500"
  }`}
>
  {product.change.dir === "up"
    ? "▲"
    : product.change.dir === "down"
      ? "▼"
      : "—"}{" "}
  {product.change.pct.toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%
</span>
      </div>
    </Link>
  );
}

