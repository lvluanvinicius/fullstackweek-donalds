"use server";

import { ConsumptionMethod } from "@prisma/client";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../../helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async ({
  consumptionMethod,
  customerCpf,
  customerName,
  products,
  slug,
}: CreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant is not founded");
  }

  const productWithPrice = await db.product.findMany({
    where: {
      id: {
        in: products.map((pr) => pr.id),
      },
    },
  });

  const productWithPriceAndQuantity = products.map((pr) => ({
    productId: pr.id,
    quantity: pr.quantity,
    price: productWithPrice.find((prod) => prod.id === pr.id)!.price,
  }));

  await db.order.create({
    data: {
      consumptionMethod,
      status: "PENDING",
      customerCpf: removeCpfPunctuation(customerCpf),
      customerName,
      restaurantId: restaurant.id,
      orderProduct: {
        createMany: {
          data: productWithPriceAndQuantity,
        },
      },
      total: productWithPriceAndQuantity.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
    },
  });
};
