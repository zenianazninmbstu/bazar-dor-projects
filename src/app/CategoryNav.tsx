"use client";

import { usePathname } from "next/navigation";

type Category = {
  id: string;
  slug: string;
  icon: string;
  nameBn: string;
};

type CategoryNavProps = {
  categories: Category[];
};

export default function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200">
  <div className="mx-auto flex w-[80%] flex-wrap gap-3 py-2">
      {categories.map((category) => {
        const isActive = pathname === `/category/${category.slug}`;

        return (
          <a
            key={category.id}
            href={`/category/${category.slug}`}
            className={`text-[12px] mr-4 px-2 py-1 ${
              isActive ? "bg-green-100 font-bold" : ""
            }`}
          >
            {category.icon} {category.nameBn}
          </a>
        );
      })}
    </div>
    </div>
  );
}