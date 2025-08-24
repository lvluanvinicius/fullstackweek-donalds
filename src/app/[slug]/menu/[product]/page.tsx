import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-detail";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
  params: Promise<{ product: string; slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { product, slug } = await params;

  const productData = await db.product.findUnique({
    where: {
      id: product,
    },
    include: {
      Restaurant: {
        select: { name: true, avatarImageUrl: true, slug: true },
      },
    },
  });

  if (!productData) {
    return notFound();
  }

  if (productData.Restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={productData} />
      <ProductDetails product={productData} />
    </div>
  );
};

export default ProductPage;
