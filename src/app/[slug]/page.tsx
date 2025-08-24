import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-4">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-sembold">{restaurant.name}</h2>
      </div>
      <div className="space-y-2 pt-24 text-center">
        <h3 className="font-sembold text-2xl">Seja bem-vindo!</h3>
        <p className="text-sm text-zinc-600">
          Escolha como prefere aproveitar sua refeição. Estamos oferecer
          praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          buttonText="Para comer aqui"
          imageAlt="Para comer aqui"
          imageUrl="/uploads/dine_in.png"
          slug={slug}
          option="DINE_IN"
        />
        <ConsumptionMethodOption
          buttonText="Para levar"
          imageAlt="Para levar"
          imageUrl="/uploads/takeaway.png"
          slug={slug}
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
