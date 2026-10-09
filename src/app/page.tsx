
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import Hero from "./Hero";
import ProductSections from "./ProductSections";
import Navbar from "./Navbar";


async function getCategories() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}


async function getProducts() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
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
<Navbar />
<CategoryNav categories={categories} />
<PriceTicker products={products} />

      </nav>
      <Hero />
       <ProductSections products={products} />
    </main>
  );
}