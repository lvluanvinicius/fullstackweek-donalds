"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider value={{ isOpen, products, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
