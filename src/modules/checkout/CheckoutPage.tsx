import { useState } from "react";
import { Link } from "react-router";

import EmptyCartMessage from "../cart/EmptyCartMessage";
import { useCartStore } from "../cart/cart.state";
import ProductsBoundary from "../products/ProductsBoundary";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

export default function CheckoutPage() {
  const isCartEmpty = useCartStore((state) => state.cart.length === 0);
  // Set once the order is placed; only this page needs it
  const [customerName, setCustomerName] = useState<string | null>(null);

  if (customerName !== null) {
    return (
      <section className="checkout" aria-labelledby="checkout-title">
        <title>Order placed | DH Bags</title>
        <h1 className="section-title" id="checkout-title">
          Thank you, {customerName}
        </h1>
        <p className="no-results" role="status">
          Your order has been placed.
        </p>
        <Link className="button" to="/products">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout" aria-labelledby="checkout-title">
      <title>Checkout | DH Bags</title>
      <h1 className="section-title" id="checkout-title">
        Checkout
      </h1>
      {isCartEmpty ? (
        <EmptyCartMessage />
      ) : (
        <div className="checkout-layout">
          <CheckoutForm onOrderPlaced={setCustomerName} />
          <aside className="order-summary" aria-label="Order summary">
            <h2 className="order-summary-title">Your order</h2>
            <ProductsBoundary
              loadingMessage="Loading your order…"
              errorMessage="Your order summary could not be loaded."
            >
              <OrderSummary />
            </ProductsBoundary>
          </aside>
        </div>
      )}
    </section>
  );
}
