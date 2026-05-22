import { notFound } from "next/navigation";

import CatalogPageClient from "../../../../components/CatalogPageClient";
import { getCategories } from "../../../../lib/api";

async function getCategory(slug) {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) || null;
}

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((category) => ({ slug: category.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "Категорията не е намерена | Camper Rent",
    };
  }

  return {
    title: `${category.name} | Онлайн магазин | Camper Rent`,
    description: `Разгледайте продукти от категория ${category.name} в онлайн магазина на Camper Rent.`,
    alternates: {
      canonical: `/store/category/${encodeURIComponent(category.slug)}`,
    },
  };
}

export default async function StoreCategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) notFound();

  return <CatalogPageClient initialCategorySlug={category.slug} />;
}
