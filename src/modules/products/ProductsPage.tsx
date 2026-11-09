import ProductFilters from "./ProductFilters";
import ProductsBoundary from "./ProductsBoundary";
import ProductsCatalog from "./ProductsCatalog";
import { useProductFilters } from "./useProductFilters";

export default function ProductsPage() {
  const { filters, setFilters } = useProductFilters();

  return (
    <section className="products" aria-labelledby="products-title">
      <title>Products | DH Bags</title>
      <p className="eyebrow">The collection</p>
      <h1 className="section-title" id="products-title">
        Products
      </h1>
      <ProductFilters filters={filters} onChange={setFilters} />
      <ProductsBoundary
        loadingMessage="Loading products…"
        errorMessage="Products could not be loaded."
      >
        <ProductsCatalog filters={filters} />
      </ProductsBoundary>
    </section>
  );
}
