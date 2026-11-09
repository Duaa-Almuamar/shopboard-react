import { formatPrice } from "../../shared/format/price";
import type { Category, Product } from "./products.types";

// One illustration per category
const categoryImages: Record<Category, string> = {
  Bags: "/images/bags.svg",
  Shoes: "/images/shoes.svg",
  Accessories: "/images/accessories.svg",
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card">
      <img
        className="product-image"
        src={categoryImages[product.category]}
        alt=""
        width="400"
        height="500"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
      <button
        className="button"
        type="button"
        data-id={product.id}
        disabled={!product.inStock}
        onClick={() => onAddToCart(product.id)}
      >
        {product.inStock ? "Add to cart" : "Out of stock"}
      </button>
    </article>
  );
}
