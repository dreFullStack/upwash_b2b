const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.vehicleCategory.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      code: 'excavator',
      vehicleTypes: {
        create: [
          {
            code: 'excavator-small',
          },
          {
            code: 'excavator-large',
          },
        ],
      }
    },
  });

  await prisma.vehicleCategory.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      code: 'truck',
      vehicleTypes: {
        create: [
          {
            code: 'truck-small',
          },
          {
            code: 'truck-large',
          },
        ],
      },
    },
  });

  await prisma.vehicleCategory.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      code: 'van',
      vehicleTypes: {
        create: [
          {
            code: 'van-small',
          },
          {
            code: 'van-large',
          },
        ],
      },
    },
  });

  await prisma.vehicleCategory.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      code: 'passenger-car',
      vehicleTypes: {
        create: [
          {
            code: 'passenger-car',
          },
        ],
      },
    },
  });
}

module.exports = {
  main,
};
