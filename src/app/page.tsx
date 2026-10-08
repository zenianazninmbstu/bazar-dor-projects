
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import Hero from "./Hero";
import ProductSections from "./ProductSections";


async function getCategories() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}


async function getProducts() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}
export default async function Home() {
  const categories = await getCategories();
  const products = await getProducts();

  console.log(categories);
    console.log(products);

  return (
  <main>
  <nav>
   <div className="border-b border-gray-200">
  <div className="w-[80%] mx-auto flex justify-between items-center">
    <div className="flex items-center gap-3">
<div className=" my-3 w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
  <img
    src="/logo-icon.png"
    alt="বাজার দর"
    className="w-8 h-8"
  />
</div>

  <div>
    <h1 className="text-lg font-bold">বাজার দর</h1>
    <p className="text-xs">বুধবার, ৮ অক্টোবর ২০২৬</p>
  </div>
</div>

    <div className="flex items-center gap-2">
  <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg">
    সাইন ইন
  </button>

  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg">
    সাইন আপ
  </button>
</div>
  </div>
</div>
<CategoryNav categories={categories} />
<PriceTicker products={products} />

      </nav>
      <Hero />
       <ProductSections products={products} />
    </main>
  );
}