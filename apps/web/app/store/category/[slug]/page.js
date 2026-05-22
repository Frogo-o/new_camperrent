import CatalogPageClient from "../../../../components/CatalogPageClient";
import { getSeoCategories } from "../../../../lib/seo-catalog";

async function getCategory(slug) {
  const categories = await getSeoCategories();
  return categories.find((category) => category.slug === slug) || null;
}

export async function generateStaticParams() {
  try {
    const categories = await getSeoCategories();
    return categories.map((category) => ({ slug: category.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  const categoryName = category?.name || slug;

  return {
    title: `${categoryName} | Онлайн магазин | Camper Rent`,
    description: `Разгледайте продукти от категория ${categoryName} в онлайн магазина на Camper Rent.`,
    alternates: {
      canonical: `/store/category/${encodeURIComponent(category?.slug || slug)}`,
    },
  };
}

export default async function StoreCategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);

  return <CatalogPageClient initialCategorySlug={category?.slug || slug} />;
}
