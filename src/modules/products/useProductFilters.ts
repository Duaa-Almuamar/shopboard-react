import { useSearchParams } from "react-router";

import { filtersFromParams, filtersToParams } from "./products.logic";
import type { ProductFilters } from "./products.types";

// The page address owns the filters, so they survive opening a product and coming back
export function useProductFilters() {
  const [params, setParams] = useSearchParams();

  function setFilters(next: ProductFilters): void {
    // flushSync keeps the search box in step with typing
    setParams(filtersToParams(next), { replace: true, flushSync: true });
  }

  return { filters: filtersFromParams(params), setFilters };
}
