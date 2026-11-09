import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">New season</p>
        <h1 className="hero-title" id="hero-title">
          Quiet elegance, carried every day
        </h1>
        <p className="hero-text">
          Handbags and accessories in clean lines and fine materials, made to be worn for years.
        </p>
        <Link className="button" to="/products">
          Discover the collection
        </Link>
      </div>
      <img className="hero-image" src="/images/hero.svg" alt="" width="400" height="500" />
    </section>
  );
}
