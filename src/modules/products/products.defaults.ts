import type { ProductFilters } from "./products.types";

// The values the filter form starts with and the Reset button returns to
// (same as the original index.html defaults and reset handler)
export const DEFAULT_FILTERS: ProductFilters = {
  search: "",
  price: "all",
  category: "all",
  sort: "default",
};
