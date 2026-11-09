import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="products" aria-labelledby="not-found-title">
      <title>Page not found | DH Bags</title>
      <h1 className="section-title" id="not-found-title">
        Page not found
      </h1>
      <p className="no-results">The page you opened does not exist.</p>
      <Link className="button" to="/">
        Go to the home page
      </Link>
    </section>
  );
}
