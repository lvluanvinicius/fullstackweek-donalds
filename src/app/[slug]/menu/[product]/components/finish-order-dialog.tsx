"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { LoaderCircle } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useCart } from "@/app/[slug]/contexts/cart";
import { isValidCpf } from "@/app/[slug]/helpers/cpf";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { createOrder } from "../../actions/create-order-action";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),

  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O cpf é obrigatório.",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido.",
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const FinishOrderDialog = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useCart();
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");

  const [processing, setProcessing] = useState<boolean>(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
  });

  const handleOnSubmit = async ({ cpf, name }: FormSchemaType) => {
    try {
      setProcessing(true);
      await new Promise((resolver) => setTimeout(resolver, 2000));

      await createOrder({
        customerCpf: cpf,
        customerName: name,
        consumptionMethod: consumptionMethod as ConsumptionMethod,
        products: products.map((prod) => ({
          id: prod.id,
          quantity: prod.quantity,
        })),
        slug,
      });

      toast.success("Pedido efetuado com sucesso.");
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <Label
              className={cn(
                "mb-4 flex flex-col gap-2",
                form.formState.errors.name && "text-red-500",
              )}
            >
              <span>Seu nome</span>
              <Input {...form.register("name")} placeholder="Seu nome" />

              {form.formState.errors.name && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </Label>
            <Label
              className={cn(
                "mb-4 flex flex-col gap-2",
                form.formState.errors.cpf && "text-red-500",
              )}
            >
              <span>Seu CPF</span>
              <Input
                type="text"
                placeholder="Digite seu CPF..."
                // format="###.###.###-##"
                // customInput={Input}
                {...form.register("cpf")}
              />
              {form.formState.errors.cpf && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.cpf.message}
                </p>
              )}
            </Label>

            <DrawerFooter>
              <Button
                type="submit"
                variant={"destructive"}
                className="rounded-full"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" /> Aguarde...
                  </>
                ) : (
                  "Finalizar"
                )}
              </Button>
              <DrawerClose asChild>
                <Button variant="secondary" className="w-full rounded-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
