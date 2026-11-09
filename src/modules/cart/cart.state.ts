// The cart store: the one owner of the cart. It saves itself to localStorage.
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { savedCart } from "./cart.guards";
import { addItem, changeQuantity, removeItem } from "./cart.logic";
import type { Cart } from "./cart.types";

interface CartStore {
  cart: Cart;
  addToCart: (id: number) => void;
  changeItemQuantity: (id: number, amount: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (id) => set((state) => ({ cart: addItem(state.cart, id) })),
      changeItemQuantity: (id, amount) =>
        set((state) => ({ cart: changeQuantity(state.cart, id, amount) })),
      removeFromCart: (id) => set((state) => ({ cart: removeItem(state.cart, id) })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shopboard-cart",
      partialize: (state) => ({ cart: state.cart }),
      // localStorage can hold anything, so the saved cart is checked before it is used
      merge: (saved, current) => ({ ...current, cart: savedCart(saved) }),
    },
  ),
);
