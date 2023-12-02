const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.fleetManager.upsert({
    where: {
      email: 'test.fleetmanager1@123.com',
    },
    update: {},
    create: {
      firstName: 'Test',
      lastName: 'Fleetmanager1',
      email: 'test.fleetmanager1@123.com',
      phone: '0401234567',
      company: {
        connect: {
          name: 'Power Trucks Oy',
        },
      },
      user: {
        connect: {
          email: 'test1@123.com',
        },
      }
    },
  });
}

module.exports = {
  main,
};
