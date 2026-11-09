import { formatPrice } from "../../shared/format/price";
import { useCartStore } from "./cart.state";
import type { CartLine } from "./cart.types";

interface CartLineItemProps {
  line: CartLine;
}

export default function CartLineItem({ line }: CartLineItemProps) {
  const changeItemQuantity = useCartStore((state) => state.changeItemQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <li className="cart-item">
      <span className="cart-item-name">{line.name}</span>
      <span className="cart-item-price">{formatPrice(line.price)}</span>
      <div className="quantity-controls">
        <button
          className="quantity-button"
          type="button"
          aria-label={`Decrease quantity of ${line.name}`}
          onClick={() => changeItemQuantity(line.id, -1)}
        >
          −
        </button>
        <span className="quantity" aria-label="Quantity">
          {line.quantity}
        </span>
        <button
          className="quantity-button"
          type="button"
          aria-label={`Increase quantity of ${line.name}`}
          onClick={() => changeItemQuantity(line.id, 1)}
        >
          +
        </button>
      </div>
      <span className="cart-item-subtotal">{formatPrice(line.price * line.quantity)}</span>
      <button
        className="remove-button"
        type="button"
        aria-label={`Remove ${line.name} from cart`}
        onClick={() => removeFromCart(line.id)}
      >
        Remove
      </button>
    </li>
  );
}
