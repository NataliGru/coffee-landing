import { MAX_QUANTITY } from "./constants";
import { normalizeQuantity } from "./utils";

export type CoffeeSize = "small" | "medium" | "large";

export type CartItem = {
  id: string;
  product: string;
  size: CoffeeSize;
  unitPrice: number;
  quantity: number;
};

type CartListener = (items: readonly CartItem[]) => void;

const cartItems: CartItem[] = [];
const listeners = new Set<CartListener>();

export const getCartItems = (): readonly CartItem[] => {
  return cartItems.map((item) => ({ ...item }));
};

const notifyCartChanged = () => {
  const items = getCartItems();

  listeners.forEach((listener) => listener(items));
};

export const subscribeToCart = (listener: CartListener) => {
  listeners.add(listener);
  listener(getCartItems());

  return () => listeners.delete(listener);
};

export const getCartItemQuantity = (itemId: string) => {
  return cartItems.find((item) => item.id === itemId)?.quantity ?? 0;
};

export const addCartItem = (newItem: CartItem) => {
  const existingItem = cartItems.find((item) => item.id === newItem.id);

  if (existingItem) {
    if (existingItem.quantity + newItem.quantity > MAX_QUANTITY) {
      return false;
    }

    existingItem.quantity += newItem.quantity;
  } else {
    if (newItem.quantity > MAX_QUANTITY) return false;

    cartItems.push({ ...newItem });
  }

  notifyCartChanged();
  return true;
};

export const removeCartItem = (itemId: string) => {
  const itemIndex = cartItems.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) return;

  cartItems.splice(itemIndex, 1);
  notifyCartChanged();
};

export const changeCartItemQuantity = (itemId: string, change: number) => {
  const item = cartItems.find((cartItem) => cartItem.id === itemId);

  if (!item) return;

  item.quantity = normalizeQuantity(item.quantity + change);
  notifyCartChanged();
};

export const clearCart = () => {
  if (cartItems.length === 0) return;

  cartItems.length = 0;
  notifyCartChanged();
};
