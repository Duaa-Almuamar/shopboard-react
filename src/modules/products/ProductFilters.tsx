import { DEFAULT_FILTERS } from "./products.defaults";
import type { ProductFilters as Filters } from "./products.types";

interface ProductFiltersProps {
  filters: Filters;
  onChange: (next: Filters) => void;
}

export default function ProductFilters({ filters, onChange }: ProductFiltersProps) {
  return (
    <form
      className="filters"
      aria-label="Filter and sort products"
      // Pressing Enter in the search box must not submit (and reload) the page
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="form-field">
        <label htmlFor="search-input">Search</label>
        <input
          className="search-input"
          id="search-input"
          name="search"
          type="search"
          placeholder="Product name"
          autoComplete="off"
          value={filters.search}
          // onChange fires on every keystroke, so results update while typing
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </p>

      <p className="form-field">
        <label htmlFor="price-filter">Price</label>
        <select
          className="price-filter"
          id="price-filter"
          name="price"
          value={filters.price}
          onChange={(event) =>
            onChange({ ...filters, price: event.target.value as Filters["price"] })
          }
        >
          <option value="all">All prices</option>
          <option value="under-50">Under $50</option>
          <option value="50-100">$50 – $100</option>
          <option value="over-100">Over $100</option>
        </select>
      </p>

      <p className="form-field">
        <label htmlFor="category-filter">Category</label>
        <select
          className="category-filter"
          id="category-filter"
          name="category"
          value={filters.category}
          onChange={(event) =>
            onChange({ ...filters, category: event.target.value as Filters["category"] })
          }
        >
          <option value="all">All categories</option>
          <option value="Bags">Bags</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
        </select>
      </p>

      <p className="form-field">
        <label htmlFor="sort-select">Sort by</label>
        <select
          className="sort-select"
          id="sort-select"
          name="sort"
          value={filters.sort}
          onChange={(event) =>
            onChange({ ...filters, sort: event.target.value as Filters["sort"] })
          }
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </p>

      <button
        className="button button-secondary reset-filters"
        type="button"
        onClick={() => onChange(DEFAULT_FILTERS)}
      >
        Reset
      </button>
    </form>
  );
}
