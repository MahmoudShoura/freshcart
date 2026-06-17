"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "@/features/products/components/ProductCard";
import { Product } from "@/features/products/types/Products.types";
import { useLanguage } from "@/context/language.context";
import { translations } from "@/context/translations";

type SearchScreenProps = {
  query: string;
  products: Product[];
};

export default function SearchScreen({ query, products }: SearchScreenProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const hasQuery = query.trim().length > 0;
  const hasResults = products.length > 0;
  const showResults = hasQuery && hasResults;
  const productCountLabel =
    products.length === 1 ? t.productResult : t.productResults;

  return (
    <main className="bg-gray-50 py-10 px-4">
      <div className="container mx-auto">
        <section className="mb-8 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8 text-start">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary-600 mb-2">
                {t.search}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {hasQuery ? t.searchResults : t.searchStartTitle}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                {hasQuery
                  ? `${t.searchResultsFor} "${query}"`
                  : t.searchStartDescription}
              </p>
            </div>

            {showResults && (
              <span className="inline-flex items-center justify-center rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
                {products.length} {productCountLabel}
              </span>
            )}
          </div>
        </section>

        {showResults ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} info={product} />
            ))}
          </section>
        ) : (
          <section className="rounded-2xl bg-white border border-gray-100 shadow-sm p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {hasQuery ? t.searchNoResultsTitle : t.searchStartTitle}
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
              {hasQuery
                ? t.searchNoResultsDescription
                : t.searchStartDescription}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
