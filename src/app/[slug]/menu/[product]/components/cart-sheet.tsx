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
  const { toggleCart, isOpen, products } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tete</SheetTitle>
          <SheetDescription>Tete</SheetDescription>
        </SheetHeader>

        {products.map((product) => (
          <div key={product.id}>
            <p>
              {product.name} - {product.quantity}
            </p>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
