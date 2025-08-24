import { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: ConsumptionMethod }>;
}

const isConsumptionMethod = (
  method: ConsumptionMethod,
): method is "DINE_IN" | "TAKEAWAY" => {
  return method === "DINE_IN" || method === "TAKEAWAY";
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethod(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
