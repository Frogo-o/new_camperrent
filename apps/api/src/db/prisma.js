require("../../load-env");

const { PrismaClient } = require("../../prisma/generated/prisma");

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function shutdownDb() {
  await prisma.$disconnect();
}

module.exports = { prisma, shutdownDb };
