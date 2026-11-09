// Checks that an unknown value is one of the cart module's types
import { isRecord } from "../../shared/types/guards";
import type { Cart, CartItem } from "./cart.types";

// localStorage can hold anything, so each saved item is checked before it is trusted
function isCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    Number.isInteger(value.id) &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
}

// What the persist middleware loads from localStorage
export function savedCart(value: unknown): Cart {
  return isRecord(value) && Array.isArray(value.cart) ? value.cart.filter(isCartItem) : [];
}
