// Connects the modules (React version of the original src/main.ts).
// The API, logic and storage files are copied unchanged from shopboard.
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/Footer";
import Toast from "./shared/ui/Toast";
import { useToast } from "./shared/ui/useToast";

// Products
import type { Product, ProductFilters } from "./modules/products/products.types";
import { getProducts } from "./modules/products/products.api";
import { catalogTotal } from "./modules/products/products.logic";
import ProductsSection, { type ProductsView } from "./modules/products/ProductsSection";
import { DEFAULT_FILTERS } from "./modules/products/products.defaults";

// Cart
import type { Cart, CartAction } from "./modules/cart/cart.types";
import {
  addToCart,
  changeQuantity,
  clearCart,
  getCart,
  removeFromCart,
} from "./modules/cart/cart.state";
import { cartCount, cartTotal, toCartLines } from "./modules/cart/cart.logic";
import CartSection from "./modules/cart/CartSection";

const cartActions: Record<CartAction, (id: number) => void> = {
  increase: (id) => changeQuantity(id, 1),
  decrease: (id) => changeQuantity(id, -1),
  remove: (id) => removeFromCart(id),
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<ProductsView>("loading");
  const [catalogTotalValue, setCatalogTotalValue] = useState<number | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);

  // cart.state.ts stays the single owner of the cart and localStorage;
  // this state only mirrors it so React redraws after every change
  const [cart, setCart] = useState<Cart>(getCart);
  // The original draws the cart only after products load or after a cart action
  const [cartDrawn, setCartDrawn] = useState(false);

  const { toast, showToast } = useToast();

  // Load products once (the original start() function)
  useEffect(() => {
    // In development StrictMode runs effects twice; only the last run updates the page
    let ignore = false;

    async function start(): Promise<void> {
      let loaded: Product[];
      try {
        loaded = await getProducts(); // get
      } catch (error) {
        if (ignore) return;
        console.error(error);
        setView("error");
        return;
      }
      if (ignore) return;
      setProducts(loaded); // draw
      setCatalogTotalValue(catalogTotal(loaded));
      setView("list");
      setCartDrawn(true);
    }

    start();
    return () => {
      ignore = true;
    };
  }, []);

  function updateCart(): void {
    setCart(getCart());
    setCartDrawn(true);
  }

  function handleFiltersChange(next: ProductFilters): void {
    setFilters(next);
    setView("list");
  }

  function handleAddToCart(id: number): void {
    addToCart(id);
    updateCart();
    showToast("Added to cart");
  }

  function handleCartAction(action: CartAction, id: number): void {
    cartActions[action](id);
    updateCart();
  }

  function handleClearCart(): void {
    clearCart();
    updateCart();
  }

  const lines = toCartLines(cart, products);

  return (
    <>
      <Header cartCount={cartDrawn ? cartCount(lines) : 0} />

      <main>
        <Hero />
        <ProductsSection
          view={view}
          products={products}
          filters={filters}
          catalogTotal={catalogTotalValue}
          onFiltersChange={handleFiltersChange}
          onAddToCart={handleAddToCart}
        />
        <CartSection
          lines={cartDrawn ? lines : null}
          total={cartTotal(lines)}
          onCartAction={handleCartAction}
          onClearCart={handleClearCart}
        />
        <RegisterForm />
      </main>

      <Footer />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
