import { formatPrice } from "../../shared/format/price";
import type { CartAction, CartLine } from "./cart.types";

interface CartLineItemProps {
  line: CartLine;
  onCartAction: (action: CartAction, id: number) => void;
}

export default function CartLineItem({ line, onCartAction }: CartLineItemProps) {
  return (
    <li className="cart-item">
      <span className="cart-item-name">{line.name}</span>
      <span className="cart-item-price">{formatPrice(line.price)}</span>
      <div className="quantity-controls">
        <button
          className="quantity-button"
          type="button"
          data-action="decrease"
          data-id={line.id}
          aria-label={`Decrease quantity of ${line.name}`}
          onClick={() => onCartAction("decrease", line.id)}
        >
          −
        </button>
        <span className="quantity" aria-label="Quantity">
          {line.quantity}
        </span>
        <button
          className="quantity-button"
          type="button"
          data-action="increase"
          data-id={line.id}
          aria-label={`Increase quantity of ${line.name}`}
          onClick={() => onCartAction("increase", line.id)}
        >
          +
        </button>
      </div>
      <span className="cart-item-subtotal">{formatPrice(line.price * line.quantity)}</span>
      <button
        className="remove-button"
        type="button"
        data-action="remove"
        data-id={line.id}
        aria-label={`Remove ${line.name} from cart`}
        onClick={() => onCartAction("remove", line.id)}
      >
        Remove
      </button>
    </li>
  );
}
