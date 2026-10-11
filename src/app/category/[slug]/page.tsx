
import { notFound } from "next/navigation";



import CategoryProducts from "../../CategoryProducts";



type Category = {
  id: string;
  slug: string;
  icon: string;
  nameBn: string;
};

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
  params: Promise<{ slug: string }>;
};

const API = "https://openapi.programming-hero.com/api/bazardor";

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [categoryRes, categoriesRes, productsRes] = await Promise.all([
    fetch(`${API}/categories/${slug}`),
    fetch(`${API}/categories`),
    fetch(`${API}/products?category=${slug}`),
  ]);


  if (!categoryRes.ok) notFound();

  const category: Category = await categoryRes.json();
  const categories: Category[] = categoriesRes.ok
    ? await categoriesRes.json()
    : [];
  const products: Product[] = productsRes.ok
    ? await productsRes.json()
    : [];

  return (
    <main className="min-h-[70vh]">
     

      <section className="mx-auto w-[80%] py-8">
        <div className="rounded-2xl border border-green-100 bg-green-50 p-6 sm:p-8">
          <p className="mb-2 text-sm text-green-700">
            বাজারদর / {category.nameBn}
          </p>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            {category.icon} {category.nameBn}
          </h1>
          <p className="mt-3 text-sm text-gray-600">
  {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
</p>
        </div>

        <CategoryProducts products={products} />
      </section>

      
    </main>
  );
}