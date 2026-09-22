const {
  PrismaClient,
} = require("@prisma/client");

const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash(
    "Admin@12345",
    10
  );

  await prisma.user.upsert({
    where: {
      email: "admin@kitchenware.com",
    },
    update: {},
    create: {
      name: "Kitchenware Admin",
      email: "admin@kitchenware.com",
      password,
      role: "ADMIN",
    },
  });

  

  const smartHome = await prisma.category.upsert({
    where: {
      name: "Smart Home",
    },
    update: {},
    create: {
      name: "Smart Home",
    },
  });

  const lighting = await prisma.category.upsert({
    where: {
      name: "Lighting",
    },
    update: {},
    create: {
      name: "Lighting",
    },
  });

  const security = await prisma.category.upsert({
    where: {
      name: "Security",
    },
    update: {},
    create: {
      name: "Security",
    },
  });

  const products = [
    {
      name: "Luma Smart Lamp",
      slug: "luma-smart-lamp",
      description:
        "A premium smart lamp with adjustable brightness and warm ambient lighting.",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
      stock: 45,
      featured: true,
      categoryId: lighting.id,
    },
    {
      name: "Luma Hub Mini",
      slug: "luma-hub-mini",
      description:
        "Compact smart home hub designed to connect your Luma devices.",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1558008258-3256797b43f3",
      stock: 28,
      featured: true,
      categoryId: smartHome.id,
    },
    {
      name: "Luma Indoor Camera",
      slug: "luma-indoor-camera",
      description:
        "1080p smart indoor camera with intelligent motion detection.",
      price: 74.99,
      image:
        "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb",
      stock: 35,
      featured: true,
      categoryId: security.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },
      update: {},
      create: product,
    });
  }

  console.log("Database seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
