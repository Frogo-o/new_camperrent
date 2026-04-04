require("../load-env");

const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function cleanupInactive() {
  console.log("🧹 Cleanup inactive data…");

  // 1️⃣ Намери неактивни продукти
  const inactiveProducts = await prisma.product.findMany({
    where: { isActive: false },
    select: { id: true },
  });

  const inactiveProductIds = inactiveProducts.map(p => p.id);

  console.log(`• Inactive products: ${inactiveProductIds.length}`);

  if (inactiveProductIds.length > 0) {
    // 2️⃣ Изтрий снимки
    const delImages = await prisma.productImage.deleteMany({
      where: { productId: { in: inactiveProductIds } },
    });

    // 3️⃣ Изтрий order items (НЕ orders)
    const delOrderItems = await prisma.orderItem.deleteMany({
      where: { productId: { in: inactiveProductIds } },
    });

    // 4️⃣ Изтрий продуктите
    const delProducts = await prisma.product.deleteMany({
      where: { id: { in: inactiveProductIds } },
    });

    console.log(`  - Deleted images: ${delImages.count}`);
    console.log(`  - Deleted order items: ${delOrderItems.count}`);
    console.log(`  - Deleted products: ${delProducts.count}`);
  }

  // 5️⃣ Изтрий неактивни категории
  const delCategories = await prisma.category.deleteMany({
    where: { isActive: false },
  });

  console.log(`• Deleted inactive categories: ${delCategories.count}`);

  // 6️⃣ Изтрий неактивни брандове
  const delBrands = await prisma.brand.deleteMany({
    where: { isActive: false },
  });

  console.log(`• Deleted inactive brands: ${delBrands.count}`);

  console.log("✅ Cleanup completed.");
}

cleanupInactive()
  .catch((e) => {
    console.error("❌ Cleanup failed:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
