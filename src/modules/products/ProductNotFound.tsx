import { Link } from "react-router";

export default function ProductNotFound() {
  return (
    <>
      <title>Product not found | DH Bags</title>
      <h1 className="section-title">Product not found</h1>
      <p className="no-results">This product does not exist.</p>
      <Link className="button" to="/products">
        Browse products
      </Link>
    </>
  );
}
