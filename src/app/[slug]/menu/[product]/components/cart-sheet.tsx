import { useCart } from "@/app/[slug]/contexts/cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CartSheet = () => {
  const { toggleCart, isOpen } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tete</SheetTitle>
          <SheetDescription>Tete</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
