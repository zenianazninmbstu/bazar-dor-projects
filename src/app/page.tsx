

import Hero from "./Hero";
import ProductSections from "./ProductSections";



async function getCategories() {
  const res = await fetch(
   "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}


async function getProducts() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
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

    console.log("Categories type:", Array.isArray(categories));
console.log("Products type:", Array.isArray(products));

 
 return (
  <>
    <Hero />
    <ProductSections products={products} />
  </>
);

}