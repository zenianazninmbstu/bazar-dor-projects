
import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";

async function getCategories() {
  const res = await fetch(
   "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) return [];

  return res.json();
}

async function getProducts() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function SiteHeader() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <nav>
      <Navbar />
      <CategoryNav categories={categories} />
      <PriceTicker products={products} />
    </nav>
  );
}