import ProductCard from "./components/ProductCard";

type Product = {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
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
    <section className="w-[80%] mx-auto my-10 space-y-10">

        
      <div>
        <h2 className="text-2xl font-bold mb-5">
        আজ দাম বেড়েছে <span className="text-red-600">▲</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-5">
          আজ দাম কমেছে <span className="text-green-600">▼</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div id="সব-পণ্য">
        <h2 className="text-2xl font-bold">
          সব পণ্য
        </h2>

        <p className="text-gray-500 mt-2 mb-5">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}