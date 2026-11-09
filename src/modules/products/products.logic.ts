// Pure: takes data, returns data. No document, fetch or localStorage.
import { DEFAULT_FILTERS } from "./products.defaults";
import { isCategoryFilter, isPriceRange, isSortOrder } from "./products.guards";
import type { PriceRange, Product, ProductFilters, SortOrder } from "./products.types";

const priceRanges: Record<PriceRange, (price: number) => boolean> = {
  all: () => true,
  "under-50": (price) => price < 50,
  "50-100": (price) => price >= 50 && price <= 100,
  "over-100": (price) => price > 100,
};

function searchProducts(list: Product[], query: string): Product[] {
  // Lowercase both sides so "BAG", "bag" and "Bag" all match
  const search = query.trim().toLowerCase();
  return list.filter((product) => product.name.toLowerCase().includes(search));
}

function filterProducts(list: Product[], filters: ProductFilters): Product[] {
  return searchProducts(list, filters.search).filter(
    (product) =>
      priceRanges[filters.price](product.price) &&
      (filters.category === "all" || product.category === filters.category),
  );
}

// Sorts a copy, so the original products array keeps its order
function sortProducts(list: Product[], order: SortOrder): Product[] {
  if (order === "price-asc") {
    return [...list].sort((a, b) => a.price - b.price);
  }
  if (order === "price-desc") {
    return [...list].sort((a, b) => b.price - a.price);
  }
  return list;
}

// Search + filters + sort together: the list the page should show
export function visibleProducts(list: Product[], filters: ProductFilters): Product[] {
  return sortProducts(filterProducts(list, filters), filters.sort);
}

export function catalogTotal(list: Product[]): number {
  return list.reduce((sum, product) => sum + product.price, 0);
}

// The filters live in the page address, where a bad value can be typed by hand
export function filtersFromParams(params: URLSearchParams): ProductFilters {
  const price = params.get("price");
  const category = params.get("category");
  const sort = params.get("sort");
  return {
    search: params.get("search") ?? DEFAULT_FILTERS.search,
    price: isPriceRange(price) ? price : DEFAULT_FILTERS.price,
    category: isCategoryFilter(category) ? category : DEFAULT_FILTERS.category,
    sort: isSortOrder(sort) ? sort : DEFAULT_FILTERS.sort,
  };
}

const filterNames: (keyof ProductFilters)[] = ["search", "price", "category", "sort"];

// Default values are left out to keep the address short
export function filtersToParams(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams();
  for (const name of filterNames) {
    if (filters[name] !== DEFAULT_FILTERS[name]) {
      params.set(name, filters[name]);
    }
  }
  return params;
}
