// Keeps one promise per request. Suspense needs the same promise on every render,
// and a page that opens later reuses what is already loaded.
import { getProduct, getProducts } from "./products.api";
import type { Product } from "./products.types";

let productsPromise: Promise<Product[]> | null = null;
const productPromises = new Map<number, Promise<Product>>();

export function readProducts(): Promise<Product[]> {
  productsPromise ??= getProducts();
  return productsPromise;
}

export function readProduct(id: number): Promise<Product> {
  let promise = productPromises.get(id);
  if (promise === undefined) {
    promise = getProduct(id);
    productPromises.set(id, promise);
  }
  return promise;
}

// A failed promise stays failed, so Try again has to forget it
export function resetProductsCache(): void {
  productsPromise = null;
  productPromises.clear();
}
