import { use } from "react";

import { formatPrice } from "../../shared/format/price";
import ProductCard from "./ProductCard";
import { readProducts } from "./products.cache";
import { catalogTotal, visibleProducts } from "./products.logic";
import type { ProductFilters } from "./products.types";

interface ProductsCatalogProps {
  filters: ProductFilters;
}

export default function ProductsCatalog({ filters }: ProductsCatalogProps) {
  const products = use(readProducts());

  if (products.length === 0) {
    return <p className="no-results">No products are available right now.</p>;
  }

  const visible = visibleProducts(products, filters);

  return (
    <>
      <p className="catalog-total">
        Total value of all products: {formatPrice(catalogTotal(products))}
      </p>
      <p className="result-count" aria-live="polite">
        Showing {visible.length} of {products.length} products
      </p>
      {visible.length === 0 ? (
        <p className="no-results">No products match these filters.</p>
      ) : (
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
