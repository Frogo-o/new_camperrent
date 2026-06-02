import ProductPageClient from "./ProductPageClient";
import { getProductBySlug } from "../../../lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) {
    return {
      title: "Продуктът не е намерен | Camper Rent",
      description: "Продуктът не е наличен или вече не се предлага в каталога на Camper Rent.",
    };
  }

  const categoryName = product?.category?.name || "Кемпер оборудване";
  const articleNumber = product?.articleNumber ? ` Арт. № ${product.articleNumber}.` : "";
  const descriptionText = String(product?.description || "").replace(/\s+/g, " ").trim();
  const description = descriptionText
    ? descriptionText.slice(0, 155)
    : `Разгледайте ${product.name} от категория ${categoryName} в каталога на Camper Rent.${articleNumber}`;

  return {
    title: `${product.name} | Camper Rent`,
    description,
    alternates: {
      canonical: `/product/${encodeURIComponent(product.slug)}`,
    },
  };
}

export default function ProductPage() {
  return <ProductPageClient />;
}
