import { formatPrice } from "../../shared/format/price";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { catalogTotal, visibleProducts } from "./products.logic";
import type { Product, ProductFilters as Filters } from "./products.types";

export type ProductsStatus = "loading" | "error" | "ready";

interface ProductsSectionProps {
  status: ProductsStatus;
  products: Product[];
  filters: Filters;
  onFiltersChange: (next: Filters) => void;
  onAddToCart: (id: number) => void;
  onRetry: () => void;
}

export default function ProductsSection({
  status,
  products,
  filters,
  onFiltersChange,
  onAddToCart,
  onRetry,
}: ProductsSectionProps) {
  const hasProducts = status === "ready" && products.length > 0;
  const visible = hasProducts ? visibleProducts(products, filters) : [];

  return (
    <section className="products" id="products" aria-labelledby="products-title">
      <p className="eyebrow">The collection</p>
      <h2 className="section-title" id="products-title">
        Products
      </h2>
      {hasProducts && (
        <p className="catalog-total">
          Total value of all products: {formatPrice(catalogTotal(products))}
        </p>
      )}

      <ProductFilters filters={filters} onChange={onFiltersChange} />

      <p className="result-count" aria-live="polite">
        {hasProducts ? `Showing ${visible.length} of ${products.length} products` : ""}
      </p>

      <div className="product-grid">
        {status === "loading" && (
          <p className="no-results" role="status">
            Loading products…
          </p>
        )}

        {status === "error" && (
          <div className="no-results" role="alert">
            <p>Products could not be loaded.</p>
            <button className="button" type="button" onClick={onRetry}>
              Try again
            </button>
          </div>
        )}

        {status === "ready" && products.length === 0 && (
          <p className="no-results">No products are available right now.</p>
        )}

        {hasProducts && visible.length === 0 && (
          <p className="no-results">No products match these filters.</p>
        )}

        {visible.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
