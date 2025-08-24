import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/product-header";

interface ProductPageProps {
  params: Promise<{ slug: string; product: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { product } = await params;

  const productData = await db.product.findUnique({
    where: {
      id: product,
    },
  });

  if (!productData) {
    return notFound();
  }

  return (
    <>
      <ProductHeader product={productData} />
      <div>produto</div>
    </>
  );
};

export default ProductPage;
