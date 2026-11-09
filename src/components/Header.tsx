interface HeaderProps {
  cartCount: number;
}

export default function Header({ cartCount }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="logo" href="#hero" aria-label="DH Bags, home">
        <span className="logo-mark" aria-hidden="true">DH</span>
        <span className="logo-text">DH Bags</span>
      </a>
      <nav className="site-nav" aria-label="Main">
        <ul className="nav-list">
          <li><a className="nav-link" href="#hero">Home</a></li>
          <li><a className="nav-link" href="#products">Products</a></li>
          <li>
            <a className="nav-link" href="#cart">Cart (<span className="cart-count">{cartCount}</span>)</a>
          </li>
          <li><a className="nav-link" href="#register">Register</a></li>
        </ul>
      </nav>
    </header>
  );
}
