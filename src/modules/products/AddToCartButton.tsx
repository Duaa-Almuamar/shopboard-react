import { useToastStore } from "../../shared/ui/toast.state";
import { useCartStore } from "../cart/cart.state";
import type { Product } from "./products.types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);

  function handleClick(): void {
    addToCart(product.id);
    showToast("Added to cart");
  }

  return (
    <button className="button" type="button" disabled={!product.inStock} onClick={handleClick}>
      {product.inStock ? "Add to cart" : "Out of stock"}
    </button>
  );
}
