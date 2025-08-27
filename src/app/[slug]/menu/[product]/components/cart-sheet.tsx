import { useState } from "react";

import { useCart } from "@/app/[slug]/contexts/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] =
    useState<boolean>(false);
  const { toggleCart, isOpen, products, total } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col gap-4 py-5">
          <ScrollArea className="h-full flex-auto pr-2">
            <div className="flex flex-col gap-4 py-2">
              {products.length > 0 ? (
                products.map((product) => (
                  <CartProductItem key={product.id} product={product} />
                ))
              ) : (
                <span className="text-center text-sm text-muted-foreground">
                  Você ainda não selecionou nenhum produto.
                </span>
              )}
            </div>
          </ScrollArea>

          <Card className="mb-6 border-none">
            <CardContent className="p-0">
              <div className="flex justify-between gap-4">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-lg font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => setFinishOrderDialogIsOpen(true)}
            className="w-full rounded-full"
          >
            Finalizar pedido
          </Button>

          <FinishOrderDialog
            isOpen={finishOrderDialogIsOpen}
            setOpen={setFinishOrderDialogIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
