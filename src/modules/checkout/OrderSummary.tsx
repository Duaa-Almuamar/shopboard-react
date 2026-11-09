import { use } from "react";

import { formatPrice } from "../../shared/format/price";
import { cartTotal, toCartLines } from "../cart/cart.logic";
import { useCartStore } from "../cart/cart.state";
import { readProducts } from "../products/products.cache";

export default function OrderSummary() {
  const cart = useCartStore((state) => state.cart);
  const products = use(readProducts());

  const lines = toCartLines(cart, products);

  return (
    <>
      <ul className="order-lines">
        {lines.map((line) => (
          <li className="order-line" key={line.id}>
            <span>
              {line.name} × {line.quantity}
            </span>
            <span>{formatPrice(line.price * line.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="cart-summary">
        Total: <strong className="cart-total">{formatPrice(cartTotal(lines))}</strong>
      </p>
    </>
  );
}
