import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartProduct } from '@/interfaces';

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  getSummaryInformation: () => {
    subtotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //methods
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // check if the product already exists with the same size
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });

          return;
        }

        // I'm aware that the product exists with the same size, I need to increment quantity
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subtotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

        return {
          subtotal,
          tax,
          total,
          itemsInCart,
        };
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);
