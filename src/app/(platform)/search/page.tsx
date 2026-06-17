import SearchScreen from "@/features/search/screens/search.screen";
import { getProductsForSearch } from "@/features/products/server/products.actions";
import { Product } from "@/features/products/types/Products.types";
import {
  normalizeSearchText,
  productMatchesSearch,
} from "@/features/search/utils/search.utils";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = rawQuery?.trim() || "";
  const normalizedQuery = normalizeSearchText(query);

  let products: Product[] = [];

  if (normalizedQuery) {
    const response = await getProductsForSearch();
    products = response.data.filter((product) =>
      productMatchesSearch(product, query),
    );
  }

  return <SearchScreen query={query} products={products} />;
}
