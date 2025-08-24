import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartProduct, useCart } from "../../../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
  const { addProcut, decreaseProductQuantity } = useCart();

  const handleIncreaseQuantity = () => {
    decreaseProductQuantity(product.id);
  };

  const handleAddToCart = () => {
    addProcut(product);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-200">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>

        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>

          <div className="flex items-center gap-1">
            <Button
              className="h-7 w-7 rounded-lg"
              variant={"outline"}
              onClick={handleIncreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>

            <p className="w-8 text-center text-sm">{product.quantity}</p>

            <Button
              className="h-7 w-7 rounded-lg"
              variant={"destructive"}
              onClick={handleAddToCart}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <Button className="h-7 w-7 rounded-lg" variant={"outline"}>
        <Trash2Icon />
      </Button>
    </div>
  );
};

export default CartProductItem;
