require("../load-env");

const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const categories = [
  { name: "Interior", slug: "interior", isActive: true },
  { name: "Electricity", slug: "electricity", isActive: true },
  { name: "Rent Camper", slug: "camper-rent", isActive: true },
  { name: "Buy Camper", slug: "buy-camper", isActive: true },
];

const brands = [
  { name: "Dometic", slug: "dometic", isActive: true },
  { name: "Fiamma", slug: "fiamma", isActive: true },
  { name: "Thetford", slug: "thetford", isActive: true },
];

function joinUrl(base, path) {
  const cleanBase = String(base || "").replace(/\/+$/, "");
  const cleanPath = String(path || "").replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}

function publicAsset(pathname) {
  const base = process.env.PUBLIC_BASE_URL || "http://localhost:4000";
  const publicPath = process.env.PUBLIC_PATH || "/public";
  return joinUrl(joinUrl(base, publicPath), pathname);
}

function seededProducts(refs) {
  return [
    {
      name: "Thetford Aqua Kem Blue",
      slug: "thetford-aqua-kem-blue",
      articleNumber: "TH-88910",
      description:
        "Toilet fluid for cassette systems with a reliable fresh scent and practical concentrated formula.",
      price: 2900,
      categoryId: refs.categories.interior.id,
      brandId: refs.brands.thetford.id,
      isActive: true,
      images: [publicAsset("park/thumb-01.jpg"), publicAsset("park/thumb-02.jpg")],
      infoFiles: [
        {
          url: publicAsset("agreements/DogovorBG.pdf"),
          filename: "thetford-aqua-kem-blue-datasheet.pdf",
          originalname: "Thetford Aqua Kem Blue datasheet.pdf",
          mimetype: "application/pdf",
          size: 125000,
        },
      ],
    },
    {
      name: "Dometic Roof Window 700 x 500",
      slug: "dometic-roof-window-700-500",
      articleNumber: "DM-700500",
      description:
        "Roof window for camper and caravan retrofits with good daylight coverage and dependable sealing.",
      price: 49900,
      categoryId: refs.categories.interior.id,
      brandId: refs.brands.dometic.id,
      isActive: true,
      images: [publicAsset("park/thumb-03.jpg"), publicAsset("park/thumb-04.jpg")],
      infoFiles: [],
    },
    {
      name: "12V Utility Socket",
      slug: "12v-utility-socket",
      articleNumber: "EL-12V-001",
      description:
        "Compact 12V socket for camper accessories, charging and low-power onboard equipment.",
      price: 850,
      categoryId: refs.categories.electricity.id,
      brandId: null,
      isActive: true,
      images: [publicAsset("park/thumb-05.jpg")],
      infoFiles: [],
    },
    {
      name: "Fiamma Battery Master Switch",
      slug: "fiamma-battery-master-switch",
      articleNumber: "FI-BAT-24",
      description:
        "Main disconnect switch for service batteries, useful for maintenance and long storage periods.",
      price: 3200,
      categoryId: refs.categories.electricity.id,
      brandId: refs.brands.fiamma.id,
      isActive: true,
      images: [publicAsset("park/thumb-06.jpg")],
      infoFiles: [],
    },
    {
      name: "Camper for Rent 4 Berth",
      slug: "camper-for-rent-4-berth",
      articleNumber: "RENT-4B-01",
      description:
        "Seed rental listing for a 4 berth camper, suitable for validating rent-specific frontend and order flows.",
      price: 17500,
      categoryId: refs.categories["camper-rent"].id,
      brandId: refs.brands.dometic.id,
      isActive: true,
      images: [publicAsset("about/camper.jpg"), publicAsset("park/hero.jpg")],
      infoFiles: [
        {
          url: publicAsset("agreements/DogovorBG.pdf"),
          filename: "camper-rent-terms.pdf",
          originalname: "Rental terms.pdf",
          mimetype: "application/pdf",
          size: 280000,
        },
      ],
    },
    {
      name: "Camper for Sale Premium",
      slug: "camper-for-sale-premium",
      articleNumber: "BUY-PREM-01",
      description:
        "Seed buy listing for a premium camper used to validate product detail pages and buy-category logic.",
      price: 1435000,
      categoryId: refs.categories["buy-camper"].id,
      brandId: refs.brands.dometic.id,
      isActive: true,
      images: [publicAsset("about/camper.jpg"), publicAsset("park/thumb-02.jpg")],
      infoFiles: [
        {
          url: publicAsset("agreements/DogovorBG.pdf"),
          filename: "camper-sale-specification.pdf",
          originalname: "Camper sale specification.pdf",
          mimetype: "application/pdf",
          size: 340000,
        },
      ],
    },
  ];
}

async function upsertLookups() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        isActive: category.isActive,
      },
      create: category,
    });
  }

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {
        name: brand.name,
        isActive: brand.isActive,
      },
      create: brand,
    });
  }

  const categoryRows = await prisma.category.findMany({
    where: { slug: { in: categories.map((x) => x.slug) } },
    select: { id: true, slug: true, name: true },
  });

  const brandRows = await prisma.brand.findMany({
    where: { slug: { in: brands.map((x) => x.slug) } },
    select: { id: true, slug: true, name: true },
  });

  return {
    categories: Object.fromEntries(categoryRows.map((row) => [row.slug, row])),
    brands: Object.fromEntries(brandRows.map((row) => [row.slug, row])),
  };
}

async function upsertCatalogData(refs) {
  const products = seededProducts(refs);
  const seeded = [];

  for (const product of products) {
    const saved = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        articleNumber: product.articleNumber,
        description: product.description,
        price: product.price,
        isActive: product.isActive,
        categoryId: product.categoryId,
        brandId: product.brandId,
      },
      create: {
        name: product.name,
        slug: product.slug,
        articleNumber: product.articleNumber,
        description: product.description,
        price: product.price,
        isActive: product.isActive,
        categoryId: product.categoryId,
        brandId: product.brandId,
      },
      select: { id: true, slug: true, name: true, price: true },
    });

    await prisma.productImage.deleteMany({ where: { productId: saved.id } });
    await prisma.productInfoFile.deleteMany({ where: { productId: saved.id } });

    if (product.images.length > 0) {
      await prisma.productImage.createMany({
        data: product.images.map((url, index) => ({
          productId: saved.id,
          url,
          sortOrder: index,
        })),
      });
    }

    if (product.infoFiles.length > 0) {
      await prisma.productInfoFile.createMany({
        data: product.infoFiles.map((file, index) => ({
          productId: saved.id,
          url: file.url,
          filename: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          sortOrder: index,
        })),
      });
    }

    seeded.push(saved);
  }

  return seeded;
}

async function upsertSampleOrder(products) {
  const bySlug = Object.fromEntries(products.map((product) => [product.slug, product]));
  const rentProduct = bySlug["camper-for-rent-4-berth"];
  const accessoryProduct = bySlug["thetford-aqua-kem-blue"];

  if (!rentProduct || !accessoryProduct) {
    throw new Error("Missing required seeded products for sample order");
  }

  const items = [
    { productId: rentProduct.id, qty: 1, unitPrice: rentProduct.price },
    { productId: accessoryProduct.id, qty: 2, unitPrice: accessoryProduct.price },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;
  const customerEmail = "staging.order@camper-rent.bg";
  const customerPhone = "+359888000111";

  let order = await prisma.order.findFirst({
    where: {
      email: customerEmail,
      phone: customerPhone,
      note: "Seed sample order",
    },
    select: { id: true },
  });

  if (!order) {
    order = await prisma.order.create({
      data: {
        customerName: "Staging Customer",
        email: customerEmail,
        phone: customerPhone,
        address: "15 Tsarigradsko Shose Blvd, Sofia",
        deliveryMethod: "PICKUP",
        note: "Seed sample order",
        subtotal,
        deliveryFee,
        total,
        rentalPlace: "Sofia",
        rentalFrom: new Date("2026-05-10T09:00:00.000Z"),
        rentalTo: new Date("2026-05-15T09:00:00.000Z"),
        country: "Bulgaria",
        city: "Sofia",
        postalCode: "1784",
        street: "Tsarigradsko Shose Blvd 15",
        expectedMileageKm: 800,
        visitCountries: "Bulgaria, Greece",
        rentalAccessories: "Camping chairs, outdoor table, bike rack",
      },
      select: { id: true },
    });
  } else {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        subtotal,
        deliveryFee,
        total,
      },
    });
  }

  await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
  await prisma.orderItem.createMany({
    data: items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      qty: item.qty,
      unitPrice: item.unitPrice,
      lineTotal: item.qty * item.unitPrice,
    })),
  });

  const sentAt = new Date();
  const adminEmail = process.env.ORDERS_EMAIL_TO || "info@camper-rent.bg";
  const html = [
    "<h1>Seed sample order</h1>",
    `<p>Order #${order.id}</p>`,
    "<ul>",
    `<li>${rentProduct.name} x 1</li>`,
    `<li>${accessoryProduct.name} x 2</li>`,
    "</ul>",
  ].join("");

  await prisma.orderEmail.upsert({
    where: { orderId_kind: { orderId: order.id, kind: "ADMIN" } },
    update: {
      to: adminEmail,
      subject: `Seed order #${order.id} for admin`,
      html,
      status: "SENT",
      attempts: 1,
      lastError: null,
      sentAt,
      providerMessageId: `seed-admin-${order.id}`,
    },
    create: {
      orderId: order.id,
      kind: "ADMIN",
      to: adminEmail,
      subject: `Seed order #${order.id} for admin`,
      html,
      status: "SENT",
      attempts: 1,
      sentAt,
      providerMessageId: `seed-admin-${order.id}`,
    },
  });

  await prisma.orderEmail.upsert({
    where: { orderId_kind: { orderId: order.id, kind: "CUSTOMER" } },
    update: {
      to: customerEmail,
      subject: `Seed order #${order.id} confirmation`,
      html,
      status: "SENT",
      attempts: 1,
      lastError: null,
      sentAt,
      providerMessageId: `seed-customer-${order.id}`,
    },
    create: {
      orderId: order.id,
      kind: "CUSTOMER",
      to: customerEmail,
      subject: `Seed order #${order.id} confirmation`,
      html,
      status: "SENT",
      attempts: 1,
      sentAt,
      providerMessageId: `seed-customer-${order.id}`,
    },
  });

  return order.id;
}

async function main() {
  const refs = await upsertLookups();
  const products = await upsertCatalogData(refs);
  const orderId = await upsertSampleOrder(products);

  console.log("Seed OK");
  console.log(`Categories: ${Object.keys(refs.categories).join(", ")}`);
  console.log(`Brands: ${Object.keys(refs.brands).join(", ")}`);
  console.log(`Products: ${products.map((product) => product.slug).join(", ")}`);
  console.log(`Sample order: ${orderId}`);
}

main()
  .catch((error) => {
    console.error("Seed FAILED:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
