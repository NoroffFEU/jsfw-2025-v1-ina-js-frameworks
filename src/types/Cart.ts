import type { Product } from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];

  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}
