import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "../types/Cart";

/**
 * create<CartState>() defines the shape of the store using TypeScript.
 * persist middleware saves cart data to localStorage.
 */
export const useCartStore = create<CartState>()(
  persist(
    // set() = updates the store, get() = reads the current store
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        // Check if the product already exists in cart
        const existing = get().items.find(
          (item) => item.product.id === product.id
        );

        if (existing) {
          // If product exists > update quantity
          set({
            items: get().items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // If product does not exist > add new item
          set({
            items: [...get().items, { product, quantity }],
          });
        }
      },

      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },

      increaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decreaseQuantity: (productId) => {
        set({
          items: get()
            .items.map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      /**
       * If a product has a discounted price,
       * use discountedPrice.
       * Otherwise use original price
       *
       * Multiply by quantity and sum everything
       */
      getTotalPrice: () =>
        get().items.reduce((total, item) => {
          const price =
            item.product.discountedPrice &&
            item.product.discountedPrice < item.product.price
              ? item.product.discountedPrice
              : item.product.price;

          return total + price * item.quantity;
        }, 0),
    }),
    // name = key used in localStorage.
    {
      name: "cart-storage",
    }
  )
);
