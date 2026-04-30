import ProductCard from "@/features/products/components/ProductCard";
import { getAllBrands } from "@/features/brands/server/brands.actions";
import { getProductsByBrand } from "@/features/products/server/products.actions";
import Image from "next/image";

import Link from "next/link";

interface BrandDetailsScreenProps {
  brandId: string;
}

export default async function BrandDetailsScreen({
  brandId,
}: BrandDetailsScreenProps) {
  const brandsResponse = await getAllBrands();
  const brand = brandsResponse.data.find((b) => b._id === brandId);

  if (!brand) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Brand not found</h1>
          <p className="text-gray-600 mt-2">
            The requested brand could not be found.
          </p>
        </div>
      </div>
    );
  }

  const brandResponse = await getProductsByBrand({ brandId });

  const products = brandResponse.data || [];

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
              href="/brands"
              className="text-md hover:text-white text-gray-200 transition"
            >
              Brands
            </Link>
            <span className="text-white font-bold text-md">/</span>
            <span className="text-md font-bold text-white ">{brand.name}</span>
          </nav>

          <div className="flex items-center justify-center gap-3">
            <div>
              <div className="w-16 h-16 rounded-2xl  bg-primary-400 flex items-center justify-center">
                <div className="w-10 h-10 relative">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="px-3 py-3 h-full content-center w-full">
              <h2 className="text-white text-4xl font-bold mb-1 max-96">
                {brand.name}
              </h2>
              <p>Shop {brand.name} Products</p>
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
                No products found for this brand.
              </p>
              <p className="text-gray-400 text-sm mt-2">Brand ID: {brandId}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}


