
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Footer from "./Footer";
import Providers from "./Providers";
import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bazar-Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

async function getCategories() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories"
    );

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}

async function getProducts() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products"
    );

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <Navbar />
          <CategoryNav categories={categories} />
          <PriceTicker products={products} />

          <main className="flex-1">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
