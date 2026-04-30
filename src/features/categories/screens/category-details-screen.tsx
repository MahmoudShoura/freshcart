import ProductCard from "@/features/products/components/ProductCard";
import { getAllCategories } from "@/features/categories/server/categories.actions";
import { getProductsByCategory } from "@/features/products/server/products.actions";
import Image from "next/image";

import Link from "next/link";

interface CategoryDetailsScreenProps {
  categoryId: string;
}

export default async function CategoryDetailsScreen({
  categoryId,
}: CategoryDetailsScreenProps) {
  const categoriesResponse = await getAllCategories();
  const category = categoriesResponse.data.find((b) => b._id === categoryId);

  if (!category) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <p className="text-gray-600 mt-2">
            The requested category could not be found.
          </p>
        </div>
      </div>
    );
  }

  const categoryResponse = await getProductsByCategory({ categoryId });

  const products = categoryResponse.data || [];

  return (
    <>
      <div className="h-full flex items-center justify-center  ">
        <div className="overlay py-14 px-8 text-white p-4 w-full h-full content-center bg-linear-to-r from-primary-600/80 to-primary-600/90">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link
              href="/"
              className="text-md hover:text-white text-gray-200 transition"
            >
              Home
            </Link>
            <span className="text-white font-bold text-md">/</span>
            <Link
              href="/categories"
              className="text-md hover:text-white text-gray-200 transition"
            >
              Categories
            </Link>
            <span className="text-white font-bold text-md">/</span>
            <span className="text-md font-bold text-white ">{category.name}</span>
          </nav>

          <div className="flex items-center justify-center gap-3">
            <div>
              <div className="w-16 h-16 rounded-2xl  bg-primary-400 flex items-center justify-center">
                <div className="w-10 h-10 relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="px-3 py-3 h-full content-center w-full">
              <h2 className="text-white text-4xl font-bold mb-1 max-96">
                {category.name}
              </h2>
              <p>Shop {category.name} Products</p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-10">
        <div className="container mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} info={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found for this category.
              </p>
              <p className="text-gray-400 text-sm mt-2">Category ID: {categoryId}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}


