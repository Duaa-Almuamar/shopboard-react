import type { ProductFilters } from "./products.types";

// The values the filter form starts with and the Reset button returns to
export const DEFAULT_FILTERS: ProductFilters = {
  search: "",
  price: "all",
  category: "all",
  sort: "default",
};
