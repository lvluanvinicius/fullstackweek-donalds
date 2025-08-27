"use client";

import { Product } from "@prisma/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  toggleCart: () => void;
  addProcut: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  toggleCart: () => {},
  addProcut: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState<number>(0);

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

  const removeProduct = (productId: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== productId));
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) => {
      return prev.map(function (pr) {
        if (pr.id !== productId) {
          return pr;
        }

        return { ...pr, quantity: pr.quantity - 1 <= 0 ? 1 : pr.quantity - 1 };
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) => {
      return prev.map(function (pr) {
        if (pr.id !== productId) {
          return pr;
        }

        return { ...pr, quantity: pr.quantity + 1 };
      });
    });
  };

  useEffect(
    function () {
      const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);

      setTotal(total);
    },
    [products],
  );

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        total,
        toggleCart,
        addProcut,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
