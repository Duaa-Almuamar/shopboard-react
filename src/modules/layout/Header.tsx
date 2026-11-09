import { Link, NavLink } from "react-router";

import { cartCount } from "../cart/cart.logic";
import { useCartStore } from "../cart/cart.state";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/register", label: "Register" },
];

export default function Header() {
  const count = useCartStore((state) => cartCount(state.cart));

  return (
    <header className="site-header">
      <Link className="logo" to="/" aria-label="DH Bags, home">
        <span className="logo-mark" aria-hidden="true">
          DH
        </span>
        <span className="logo-text">DH Bags</span>
      </Link>
      <nav className="site-nav" aria-label="Main">
        <ul className="nav-list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink className="nav-link" to={link.to} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink className="nav-link" to="/cart">
              Cart (<span className="cart-count">{count}</span>)
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
