import { getSeoCategories } from "../lib/seo-catalog";

const SITE_URL = String(process.env.NEXT_PUBLIC_SITE_URL || "https://camper-rent.bg").replace(/\/$/, "");

function entry(path, priority = 0.7) {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  };
}

export default async function sitemap() {
  let categories = [];

  try {
    categories = await getSeoCategories();
  } catch {
    categories = [];
  }

  return [
    entry("/", 1),
    entry("/store", 0.9),
    ...categories.map((category) => entry(`/store/category/${encodeURIComponent(category.slug)}`, 0.8)),
    entry("/rent", 0.8),
    entry("/buy", 0.8),
    entry("/about", 0.5),
    entry("/contacts", 0.5),
  ];
}
