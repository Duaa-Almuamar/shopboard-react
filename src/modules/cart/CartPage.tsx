import ProductsBoundary from "../products/ProductsBoundary";
import CartContents from "./CartContents";
import EmptyCartMessage from "./EmptyCartMessage";
import { useCartStore } from "./cart.state";

export default function CartPage() {
  const isEmpty = useCartStore((state) => state.cart.length === 0);

  return (
    <section className="cart" aria-labelledby="cart-title">
      <title>Cart | DH Bags</title>
      <h1 className="section-title" id="cart-title">
        Shopping cart
      </h1>
      {isEmpty ? (
        <EmptyCartMessage />
      ) : (
        <ProductsBoundary
          loadingMessage="Loading your cart…"
          errorMessage="Your cart could not be loaded."
        >
          <CartContents />
        </ProductsBoundary>
      )}
    </section>
  );
}
