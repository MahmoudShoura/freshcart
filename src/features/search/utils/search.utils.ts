import { Product } from "@/features/products/types/Products.types";

export type SearchSuggestion = {
  id: string;
  title: string;
  imageCover?: string;
  brandName?: string;
  categoryName?: string;
};

const ARABIC_DIACRITICS = /[\u064B-\u065F\u0670]/g;
const TATWEEL = /\u0640/g;
const ARABIC_ALEF_VARIANTS = /[\u0622\u0623\u0625]/g;
const ARABIC_ALEF_MAKSURA = /\u0649/g;
const ARABIC_TEH_MARBUTA = /\u0629/g;
const SEARCH_SEPARATORS = /[.\-_/()[\]{}"'`،؛:!?؟]+/g;

export function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(ARABIC_DIACRITICS, "")
    .replace(TATWEEL, "")
    .replace(ARABIC_ALEF_VARIANTS, "\u0627")
    .replace(ARABIC_ALEF_MAKSURA, "\u064A")
    .replace(ARABIC_TEH_MARBUTA, "\u0647")
    .replace(SEARCH_SEPARATORS, " ")
    .replace(/\s+/g, " ");
}

function normalizeCompactSearchText(value: string) {
  return normalizeSearchText(value).replace(/\s+/g, "");
}

function tokenizeSearchText(value: string) {
  return normalizeSearchText(value).split(" ").filter(Boolean);
}

function getProductSearchValues(product: Product) {
  return [
    product.title,
    product.slug,
    product.description,
    product.brand?.name,
    product.brand?.slug,
    product.category?.name,
    product.category?.slug,
    ...(product.subcategory?.map((subcategory) => subcategory.name) ?? []),
    ...(product.subcategory?.map((subcategory) => subcategory.slug) ?? []),
  ].filter(Boolean);
}

export function buildCatalogSuggestions(products: Product[]) {
  const suggestions = new Map<string, SearchSuggestion>();

  products.forEach((product) => {
    const normalizedTitle = normalizeSearchText(product.title);

    if (normalizedTitle && !suggestions.has(normalizedTitle)) {
      suggestions.set(normalizedTitle, {
        id: product._id,
        title: product.title,
        imageCover: product.imageCover,
        brandName: product.brand?.name,
        categoryName: product.category?.name,
      });
    }
  });

  return Array.from(suggestions.values());
}

function getSuggestionSearchValues(suggestion: SearchSuggestion) {
  return [suggestion.title, suggestion.brandName, suggestion.categoryName].filter(
    (value): value is string => Boolean(value),
  );
}

export function getMatchingSuggestions(
  suggestions: SearchSuggestion[],
  query: string,
  limit: number,
) {
  const normalizedQuery = normalizeSearchText(query);
  const compactQuery = normalizeCompactSearchText(query);

  if (normalizedQuery.length < 2) {
    return [];
  }

  const prefixMatches: SearchSuggestion[] = [];
  const containsMatches: SearchSuggestion[] = [];

  suggestions.forEach((suggestion) => {
    const searchValues = getSuggestionSearchValues(suggestion);
    const normalizedValues = searchValues.map(normalizeSearchText);
    const compactValues = searchValues.map(normalizeCompactSearchText);
    const normalizedSuggestion = normalizeSearchText(searchValues.join(" "));
    const compactSuggestion = normalizeCompactSearchText(searchValues.join(" "));

    if (
      normalizedValues.some((value) => value.startsWith(normalizedQuery)) ||
      compactValues.some((value) => value.startsWith(compactQuery))
    ) {
      prefixMatches.push(suggestion);
      return;
    }

    if (
      normalizedSuggestion.includes(normalizedQuery) ||
      compactSuggestion.includes(compactQuery)
    ) {
      containsMatches.push(suggestion);
    }
  });

  return [...prefixMatches, ...containsMatches].slice(0, limit);
}

function buildProductSearchText(product: Product) {
  return normalizeSearchText(getProductSearchValues(product).join(" "));
}

export function productMatchesSearch(product: Product, query: string) {
  const productSearchText = buildProductSearchText(product);
  const normalizedQuery = normalizeSearchText(query);
  const productCompactText = normalizeCompactSearchText(productSearchText);
  const compactQuery = normalizeCompactSearchText(query);
  const queryTokens = tokenizeSearchText(query);

  if (!normalizedQuery) {
    return false;
  }

  if (productSearchText.includes(normalizedQuery)) {
    return true;
  }

  if (compactQuery && productCompactText.includes(compactQuery)) {
    return true;
  }

  return queryTokens.every(
    (token) =>
      productSearchText.includes(token) ||
      productCompactText.includes(normalizeCompactSearchText(token)),
  );
}
