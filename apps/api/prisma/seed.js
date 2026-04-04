require("dotenv/config");

const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function upsertCategoriesAndBrands() {
  const categories = [
    { name: "Интериор", slug: "interior" },
    { name: "Електрика", slug: "electricity" },
    { name: "Наем-Кемпер", slug: "camper-rent" },
    { name: "Купи-Кемпер", slug: "buy-camper" },
  ];

  const brands = [
    { name: "Thetford", slug: "thetford" },
    { name: "Dometic", slug: "dometic" },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
  }

  for (const b of brands) {
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { name: b.name },
      create: b,
    });
  }

  const [interior, electricity, camperRent, buyCamper, thetford, dometic] = await Promise.all([
    prisma.category.findUnique({ where: { slug: "interior" }, select: { id: true, slug: true } }),
    prisma.category.findUnique({ where: { slug: "electricity" }, select: { id: true, slug: true } }),
    prisma.category.findUnique({ where: { slug: "camper-rent" }, select: { id: true, slug: true } }),
    prisma.category.findUnique({ where: { slug: "buy-camper" }, select: { id: true, slug: true } }),
    prisma.brand.findUnique({ where: { slug: "thetford" }, select: { id: true, slug: true } }),
    prisma.brand.findUnique({ where: { slug: "dometic" }, select: { id: true, slug: true } }),
  ]);

  if (!interior || !electricity || !camperRent || !buyCamper || !thetford || !dometic) {
    throw new Error("Seed failed: missing required categories/brands after upsert");
  }

  return { interior, electricity, camperRent, buyCamper, thetford, dometic };
}

async function upsertProductsAndImages({ interior, electricity, camperRent, buyCamper, thetford, dometic }) {
  const products = [
    // interior
    {
      name: "Aqua Kem Blue",
      slug: "aqua-kem-blue",
      description:
        "Концентриран препарат за химическа тоалетна. Намалява миризми и подпомага разграждането на отпадъци.",
      price: 2900,
      categoryId: interior.id,
      brandId: thetford.id,
      imageUrl: "https://via.placeholder.com/800x600?text=Aqua+Kem+Blue",
    },
    {
      name: "Прозорец за каравана",
      slug: "caravan-window",
      description: "Прозорец за каравана с добро уплътнение и UV устойчивост. Подходящ за монтаж на различни панели.",
      price: 49900,
      categoryId: interior.id,
      brandId: dometic.id,
      imageUrl: "https://via.placeholder.com/800x600?text=Caravan+Window",
    },

    // electricity
    {
      name: "Букса 12V",
      slug: "12v-socket",
      description: "12V букса за каравани и кемпери. Подходяща за захранване на аксесоари и зарядни устройства.",
      price: 850,
      categoryId: electricity.id,
      brandId: null,
      imageUrl: "https://via.placeholder.com/800x600?text=12V+Socket",
    },

    // camper-rent (RENT)
    {
      name: "Наем на кемпер (Тест)",
      slug: "rent-camper-test",
      description: "Тест продукт за наемане на кемпер (за да работи RENT логиката по category slug).",
      price: 69900,
      categoryId: camperRent.id,
      brandId: dometic.id,
      imageUrl: "https://via.placeholder.com/800x600?text=Rent+Camper",
    },

    // buy-camper (BUY)
    {
      name: "Купи кемпер (Тест)",
      slug: "buy-camper-test",
      description: "Тест продукт за купуване на кемпер (за да работи BUY логиката по category slug).",
      price: 1234500,
      categoryId: buyCamper.id,
      brandId: dometic.id,
      imageUrl: "https://via.placeholder.com/800x600?text=Buy+Camper",
    },
  ];

  const createdProducts = [];
  for (const p of products) {
    const created = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        isActive: true,
        categoryId: p.categoryId,
        brandId: p.brandId,
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        isActive: true,
        categoryId: p.categoryId,
        brandId: p.brandId,
      },
      select: { id: true, name: true, slug: true, price: true },
    });

    await prisma.productImage.deleteMany({ where: { productId: created.id } });
    await prisma.productImage.create({
      data: { productId: created.id, url: p.imageUrl, sortOrder: 0 },
      select: { id: true },
    });

    createdProducts.push(created);
  }

  return createdProducts;
}

async function upsertTestOrderWithItemsAndEmails(products) {
  const testEmail = "test.order@camperrent.local";
  const testPhone = "0000000000";

  const p1 = products.find((p) => p.slug === "aqua-kem-blue");
  const p2 = products.find((p) => p.slug === "12v-socket");
  if (!p1 || !p2) throw new Error("Seed failed: expected products not found");

  const items = [
    { productId: p1.id, qty: 2, unitPrice: p1.price },
    { productId: p2.id, qty: 1, unitPrice: p2.price },
  ];

  const subtotal = items.reduce((sum, it) => sum + it.qty * it.unitPrice, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  let order = await prisma.order.findFirst({
    where: { email: testEmail, phone: testPhone, status: "NEW" },
    select: { id: true },
  });

  if (!order) {
    order = await prisma.order.create({
      data: {
        customerName: "Test Customer",
        email: testEmail,
        phone: testPhone,
        address: "Test Address 1",
        deliveryMethod: "COURIER",
        note: "Seed test order",
        status: "NEW",
        subtotal,
        deliveryFee,
        total,
      },
      select: { id: true },
    });
  } else {
    await prisma.order.update({
      where: { id: order.id },
      data: { subtotal, deliveryFee, total },
      select: { id: true },
    });
  }

  await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
  await prisma.orderItem.createMany({
    data: items.map((it) => ({
      orderId: order.id,
      productId: it.productId,
      qty: it.qty,
      unitPrice: it.unitPrice,
      lineTotal: it.qty * it.unitPrice,
    })),
  });

  const emailOrder = {
    id: order.id,
    customerName: "Test Customer",
    email: testEmail,
    phone: testPhone,
    address: "Test Address 1",
    deliveryMethod: "COURIER",
    note: "Seed test order",
    subtotal,
    deliveryFee,
    total,
    items: [
      { productName: p1.name, qty: 2, price: p1.price, total: 2 * p1.price, categorySlug: "interior", categoryName: "Интериор" },
      { productName: p2.name, qty: 1, price: p2.price, total: 1 * p2.price, categorySlug: "electricity", categoryName: "Електрика" },
    ],
  };

  const adminTo = process.env.ORDERS_EMAIL_TO || "info@camper-rent.bg";
  const sentAt = new Date();

  await prisma.orderEmail.upsert({
    where: { orderId_kind: { orderId: order.id, kind: "ADMIN" } },
    update: {
      to: adminTo,
      subject: `Нова поръчка #${order.id}`,
      html: `<pre>${JSON.stringify(emailOrder, null, 2)}</pre>`,
      status: "SENT",
      attempts: 1,
      lastError: null,
      sentAt,
      providerMessageId: `seed-admin-${order.id}`,
    },
    create: {
      orderId: order.id,
      kind: "ADMIN",
      to: adminTo,
      subject: `Нова поръчка #${order.id}`,
      html: `<pre>${JSON.stringify(emailOrder, null, 2)}</pre>`,
      status: "SENT",
      attempts: 1,
      sentAt,
      providerMessageId: `seed-admin-${order.id}`,
    },
  });

  await prisma.orderEmail.upsert({
    where: { orderId_kind: { orderId: order.id, kind: "CUSTOMER" } },
    update: {
      to: testEmail,
      subject: `Вашата поръчка #${order.id} е получена`,
      html: `<pre>${JSON.stringify(emailOrder, null, 2)}</pre>`,
      status: "SENT",
      attempts: 1,
      lastError: null,
      sentAt,
      providerMessageId: `seed-customer-${order.id}`,
    },
    create: {
      orderId: order.id,
      kind: "CUSTOMER",
      to: testEmail,
      subject: `Вашата поръчка #${order.id} е получена`,
      html: `<pre>${JSON.stringify(emailOrder, null, 2)}</pre>`,
      status: "SENT",
      attempts: 1,
      lastError: null,
      sentAt,
      providerMessageId: `seed-customer-${order.id}`,
    },
  });

  return order.id;
}

async function main() {
  const refs = await upsertCategoriesAndBrands();
  const products = await upsertProductsAndImages(refs);
  const orderId = await upsertTestOrderWithItemsAndEmails(products);

  console.log("Seed OK");
  console.log("Products:", products.map((p) => p.slug).join(", "));
  console.log("Order ID:", orderId);
}

main()
  .catch((e) => {
    console.error("Seed FAILED:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
