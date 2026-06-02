// src/features/cart/services/cart.service.ts

export const CART_KEY = "freshcart-cart";

export interface GuestCartItem {
  productId: string;
  quantity: number;
  title?: string;
  imageCover?: string;
  price?: number;
  category?: {
    name: string;
  };
}
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getCartFromStorage(): GuestCartItem[] {
  if (!isBrowser()) return [];

  try {
    const cart = localStorage.getItem(CART_KEY);

    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(cartItems: GuestCartItem[]): void {
  if (!isBrowser()) return;

  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

export function clearCartStorage(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(CART_KEY);
}
