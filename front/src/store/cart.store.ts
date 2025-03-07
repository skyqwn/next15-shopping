import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserInfo = {
  name: string;
  phone: string;
  shippingAddress: string;
};

export type Variant = {
  variantId: number;
  quantity: number;
};

export type CartItem = {
  id: number;
  name: string;
  image: string;
  variant: Variant;
  price: number;
};

export type CartState = {
  cart: CartItem[];
  isDrawerOpen: boolean;
  setCartOpen: (val: boolean) => void;
  checkoutProgress:
    | "cart-page"
    | "shippingInfo-page"
    | "payment-page"
    | "confirmation-page";
  setCheckoutProgress: (
    progress:
      | "cart-page"
      | "shippingInfo-page"
      | "payment-page"
      | "confirmation-page",
  ) => void;
  clearCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isDrawerOpen: false,
      setCartOpen: (val) => set({ isDrawerOpen: val }),
      checkoutProgress: "cart-page",
      clearCart: () => set({ cart: [] }),
      setCheckoutProgress: (progress) =>
        set((state) => ({ checkoutProgress: progress })),
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.variant.variantId === item.variant.variantId,
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.variant.variantId === item.variant.variantId) {
                return {
                  ...cartItem,
                  variant: {
                    ...cartItem.variant,
                    quantity: cartItem.variant.quantity + item.variant.quantity,
                  },
                };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  ...item,
                  variant: {
                    variantId: item.variant.variantId,
                    quantity: item.variant.quantity,
                  },
                },
              ],
            };
          }
        }),
      removeFromCart: (item) =>
        set((state) => {
          const updateCart = state.cart.map((cartItem) => {
            if (cartItem.variant.variantId === item.variant.variantId) {
              return {
                ...cartItem,
                variant: {
                  ...cartItem.variant,
                  quantity: cartItem.variant.quantity - 1,
                },
              };
            }
            return cartItem;
          });
          return {
            cart: updateCart.filter(
              (cartItem) => cartItem.variant.quantity > 0,
            ),
          };
        }),
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    { name: "cart-storage" },
  ),
);
