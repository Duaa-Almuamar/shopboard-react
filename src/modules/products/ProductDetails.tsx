import { use } from "react";

import { formatPrice } from "../../shared/format/price";
import AddToCartButton from "./AddToCartButton";
import { readProduct } from "./products.cache";
import { categoryImages } from "./products.images";

interface ProductDetailsProps {
  id: number;
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const product = use(readProduct(id));

  return (
    <article className="product-details">
      <title>{`${product.name} | DH Bags`}</title>
      <img
        className="product-details-image"
        src={categoryImages[product.category]}
        alt=""
        width="400"
        height="500"
      />
      <div className="product-details-text">
        <p className="eyebrow">{product.category}</p>
        <h1 className="section-title">{product.name}</h1>
        <p className="product-price">{formatPrice(product.price)}</p>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
