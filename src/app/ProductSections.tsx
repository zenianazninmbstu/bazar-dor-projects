
import ProductCard from "./components/ProductCard";
import SortableProducts from "./SortableProducts";

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

type ProductSectionsProps = {
  products: Product[];
};

export default function ProductSections({
  products,
}: ProductSectionsProps) {
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto my-10 w-full max-w-6xl px-4 space-y-10">
      <div>
        <h2 className="mb-5 text-2xl font-bold">
          আজ দাম বেড়েছে <span className="text-red-600">▲</span>
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-5 text-2xl font-bold">
          আজ দাম কমেছে <span className="text-green-600">▼</span>
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div id="সব-পণ্য">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>

        <p className="mb-5 mt-2 text-gray-500">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।
        </p>

        <SortableProducts products={products} />
      </div>
    </section>
  );
}
