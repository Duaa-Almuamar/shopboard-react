// Draws the cart and hears its buttons. Does not calculate or save.
import { formatPrice } from "../../shared/format/price";
import CartLineItem from "./CartLineItem";
import type { CartAction, CartLine } from "./cart.types";

interface CartSectionProps {
  // null = the cart has not been drawn yet (same as the original before the
  // first renderCart call): empty message and "Clear cart" both visible, total $0
  lines: CartLine[] | null;
  total: number;
  onCartAction: (action: CartAction, id: number) => void;
  onClearCart: () => void;
}

export default function CartSection({ lines, total, onCartAction, onClearCart }: CartSectionProps) {
  const drawn = lines !== null;
  const hasItems = drawn && lines.length > 0;

  return (
    <section className="cart" id="cart" aria-labelledby="cart-title">
      <h2 className="section-title" id="cart-title">Shopping cart</h2>
      <p className="cart-empty" hidden={hasItems}>Your cart is empty.</p>
      <ul className="cart-list">
        {drawn &&
          lines.map((line) => (
            <CartLineItem key={line.id} line={line} onCartAction={onCartAction} />
          ))}
      </ul>
      <p className="cart-summary" aria-live="polite">
        Total: <strong className="cart-total">{formatPrice(drawn ? total : 0)}</strong>
      </p>
      <button
        className="button button-secondary clear-cart"
        type="button"
        hidden={drawn && lines.length === 0}
        onClick={onClearCart}
      >
        Clear cart
      </button>
    </section>
  );
}
