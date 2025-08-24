"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useCart } from "@/app/[slug]/contexts/cart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "./cart-sheet";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      Restaurant: {
        select: { name: true; avatarImageUrl: true; slug: true };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { Restaurant } = product;
  const { toggleCart } = useCart();

  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) return 1;

      return prev - 1;
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    toggleCart();
  };

  return (
    <>
      <div className="relative z-50 mt-[1.5rem] flex flex-auto flex-col overflow-hidden rounded-3xl p-5 pt-5">
        <div className="flex-auto overflow-hidden">
          {/* Restaurant */}
          <div className="flex items-center gap-1.5">
            <Image
              src={Restaurant.avatarImageUrl}
              alt={Restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />

            <p className="text-sm text-muted-foreground">{Restaurant.name}</p>
          </div>

          {/* Nome do Produto */}
          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

          {/* Preço e Quantidade */}
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </h3>

            <div className="flex items-center gap-3 text-center">
              <Button
                className="h-8 w-8 rounded-xl"
                variant={"outline"}
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                className="h-8 w-8 rounded-xl"
                variant={"destructive"}
                onClick={handleIncreaseQuantity}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full">
            {/* Sobre */}
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Ingredientes */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1">
                <ChefHatIcon />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                <ul className="list-disc px-5 text-sm text-muted-foreground">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient}> {ingredient.trim()}</li>
                  ))}
                </ul>
              </p>
            </div>
          </ScrollArea>
        </div>

        <Button className="mt-6 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar à sacola
        </Button>
      </div>

      <CartSheet />
    </>
  );
};

export default ProductDetails;
