import { NextResponse } from "next/server";
import { getProductsForSearch } from "@/features/products/server/products.actions";
import { buildCatalogSuggestions } from "@/features/search/utils/search.utils";

export async function GET() {
  const response = await getProductsForSearch();
  const suggestions = buildCatalogSuggestions(response.data);

  return NextResponse.json({ suggestions });
}
