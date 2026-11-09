import { Link } from "react-router";

import { formatPrice } from "../../shared/format/price";
import AddToCartButton from "./AddToCartButton";
import { categoryImages } from "./products.images";
import type { Product } from "./products.types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <img
        className="product-image"
        src={categoryImages[product.category]}
        alt=""
        width="400"
        height="500"
      />
      <h2 className="product-name">
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h2>
      <p className="product-category">{product.category}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
      <AddToCartButton product={product} />
    </article>
  );
}
