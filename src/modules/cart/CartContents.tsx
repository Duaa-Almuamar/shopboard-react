// Draws the cart and reports its buttons. Does not calculate or save.
import { formatPrice } from "../../shared/format/price";
import CartLineItem from "./CartLineItem";
import type { CartAction, CartLine } from "./cart.types";

interface CartSectionProps {
  lines: CartLine[];
  total: number;
  // A saved cart holds only ids, so its lines cannot be drawn until the products arrive
  isWaitingForProducts: boolean;
  onCartAction: (action: CartAction, id: number) => void;
  onClearCart: () => void;
}

export default function CartSection({
  lines,
  total,
  isWaitingForProducts,
  onCartAction,
  onClearCart,
}: CartSectionProps) {
  const hasItems = lines.length > 0;

  return (
    <section className="cart" id="cart" aria-labelledby="cart-title">
      <h2 className="section-title" id="cart-title">
        Shopping cart
      </h2>
      {isWaitingForProducts && (
        <p className="cart-empty">Your saved cart will appear when the products load.</p>
      )}
      {!isWaitingForProducts && !hasItems && <p className="cart-empty">Your cart is empty.</p>}
      <ul className="cart-list">
        {lines.map((line) => (
          <CartLineItem key={line.id} line={line} onCartAction={onCartAction} />
        ))}
      </ul>
      <p className="cart-summary" aria-live="polite">
        Total: <strong className="cart-total">{formatPrice(total)}</strong>
      </p>
      <button
        className="button button-secondary clear-cart"
        type="button"
        hidden={!hasItems}
        onClick={onClearCart}
      >
        Clear cart
      </button>
    </section>
  );
}
