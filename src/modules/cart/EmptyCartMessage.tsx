import { Link } from "react-router";

export default function EmptyCartMessage() {
  return (
    <>
      <p className="cart-empty">Your cart is empty.</p>
      <Link className="button" to="/products">
        Browse products
      </Link>
    </>
  );
}
