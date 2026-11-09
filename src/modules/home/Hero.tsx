export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">New season</p>
        <h1 className="hero-title" id="hero-title">
          Quiet elegance, carried every day
        </h1>
        <p className="hero-text">
          Handbags and accessories in clean lines and fine materials, made to be worn for years.
        </p>
        <a className="button" href="#products">
          Discover the collection
        </a>
      </div>
      <img className="hero-image" src="/images/hero.svg" alt="" width="400" height="500" />
    </section>
  );
}
