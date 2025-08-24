"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProcut: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProcut: () => {},
  decreaseProductQuantity: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const addProcut = (product: CartProduct) => {
    const productExists = products.some((pr) => pr.id === product.id);

    if (!productExists) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prev) => {
      return prev.map((pr) => {
        if (pr.id) {
          return {
            ...pr,
            quantity: pr.quantity + product.quantity,
          };
        }

        return pr;
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) => {
      return prev.map(function (pr) {
        if (pr.id === productId) {
          return { ...pr, quantity: pr.quantity - 1 };
        }

        return pr;
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProcut,
        decreaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
