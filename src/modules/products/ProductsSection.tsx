import { formatPrice } from "../../shared/format/price";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { visibleProducts } from "./products.logic";
import type { Product, ProductFilters as Filters } from "./products.types";

// What the grid shows, matching the original:
// "loading" = before the first draw, "error" = load failed,
// "list" = products drawn (also after any filter change, even before/after a failed load)
export type ProductsView = "loading" | "error" | "list";

interface ProductsSectionProps {
  view: ProductsView;
  products: Product[];
  filters: Filters;
  // null until products load successfully (the paragraph stays empty)
  catalogTotal: number | null;
  onFiltersChange: (next: Filters) => void;
  onAddToCart: (id: number) => void;
}

export default function ProductsSection({
  view,
  products,
  filters,
  catalogTotal,
  onFiltersChange,
  onAddToCart,
}: ProductsSectionProps) {
  const visible = view === "list" ? visibleProducts(products, filters) : [];

  return (
    <section className="products" id="products" aria-labelledby="products-title">
      <p className="eyebrow">The collection</p>
      <h2 className="section-title" id="products-title">
        Products
      </h2>
      <p className="catalog-total">
        {catalogTotal === null ? "" : `Total value of all products: ${formatPrice(catalogTotal)}`}
      </p>

      <ProductFilters filters={filters} onChange={onFiltersChange} />

      <p className="result-count" aria-live="polite">
        {view === "list" ? `Showing ${visible.length} of ${products.length} products` : ""}
      </p>

      <div className="product-grid">
        {view === "loading" && <p className="no-results">Loading products…</p>}

        {view === "error" && (
          <p className="no-results" role="alert">
            Products could not be loaded. Please refresh the page.
          </p>
        )}

        {view === "list" &&
          (visible.length ? (
            visible.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))
          ) : (
            <p className="no-results">No products match these filters.</p>
          ))}
      </div>
    </section>
  );
}
