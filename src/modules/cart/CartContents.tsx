import { use } from "react";
import { Link } from "react-router";

import { formatPrice } from "../../shared/format/price";
import { readProducts } from "../products/products.cache";
import CartLineItem from "./CartLineItem";
import EmptyCartMessage from "./EmptyCartMessage";
import { cartTotal, toCartLines } from "./cart.logic";
import { useCartStore } from "./cart.state";

export default function CartContents() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const products = use(readProducts());

  const lines = toCartLines(cart, products);

  // A saved cart can hold products the store no longer sells
  if (lines.length === 0) {
    return <EmptyCartMessage />;
  }

  return (
    <>
      <ul className="cart-list">
        {lines.map((line) => (
          <CartLineItem key={line.id} line={line} />
        ))}
      </ul>
      <p className="cart-summary" aria-live="polite">
        Total: <strong className="cart-total">{formatPrice(cartTotal(lines))}</strong>
      </p>
      <div className="cart-actions">
        <button className="button button-secondary clear-cart" type="button" onClick={clearCart}>
          Clear cart
        </button>
        <Link className="button" to="/checkout">
          Go to checkout
        </Link>
      </div>
    </>
  );
}
