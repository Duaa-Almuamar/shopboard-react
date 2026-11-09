// Owns the app's state and connects the feature modules
import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RegisterForm from "./components/RegisterForm";
import Toast from "./shared/ui/Toast";
import { useToast } from "./shared/ui/useToast";

import CartSection from "./modules/cart/CartSection";
import { cartCount, cartTotal, toCartLines } from "./modules/cart/cart.logic";
import {
  addToCart,
  changeQuantity,
  clearCart,
  getCart,
  removeFromCart,
} from "./modules/cart/cart.state";
import type { Cart, CartAction } from "./modules/cart/cart.types";

import ProductsSection, { type ProductsStatus } from "./modules/products/ProductsSection";
import { getProducts } from "./modules/products/products.api";
import { DEFAULT_FILTERS } from "./modules/products/products.defaults";
import type { Product, ProductFilters } from "./modules/products/products.types";

const cartActions: Record<CartAction, (id: number) => void> = {
  increase: (id) => changeQuantity(id, 1),
  decrease: (id) => changeQuantity(id, -1),
  remove: (id) => removeFromCart(id),
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<ProductsStatus>("loading");
  // Changing this number runs the loading effect again
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);

  // cart.state.ts owns the cart and localStorage; this copy makes React redraw after a change
  const [cart, setCart] = useState<Cart>(getCart);

  const { toast, showToast } = useToast();

  useEffect(() => {
    // Set by the cleanup, so an old request cannot overwrite a newer one
    let ignore = false;

    async function loadProducts(): Promise<void> {
      try {
        const loaded = await getProducts();
        if (ignore) return;
        setProducts(loaded);
        setStatus("ready");
      } catch {
        if (!ignore) setStatus("error");
      }
    }

    void loadProducts();
    return () => {
      ignore = true;
    };
  }, [loadAttempt]);

  function handleRetry(): void {
    setStatus("loading");
    setLoadAttempt((attempt) => attempt + 1);
  }

  function handleAddToCart(id: number): void {
    addToCart(id);
    setCart(getCart());
    showToast("Added to cart");
  }

  function handleCartAction(action: CartAction, id: number): void {
    cartActions[action](id);
    setCart(getCart());
  }

  function handleClearCart(): void {
    clearCart();
    setCart(getCart());
  }

  const lines = toCartLines(cart, products);

  return (
    <>
      <Header cartCount={cartCount(lines)} />

      <main>
        <Hero />
        <ProductsSection
          status={status}
          products={products}
          filters={filters}
          onFiltersChange={setFilters}
          onAddToCart={handleAddToCart}
          onRetry={handleRetry}
        />
        <CartSection
          lines={lines}
          total={cartTotal(lines)}
          isWaitingForProducts={status !== "ready" && cart.length > 0}
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
