"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

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
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
  });

  const handleOnSubmit = (data: FormSchemaType) => {
    console.log(data);
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
              <PatternFormat
                placeholder="Digite seu CPF..."
                format="###.###.###-##"
                customInput={Input}
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
              >
                Finalizar
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
