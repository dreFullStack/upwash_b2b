const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createCompany = async (
  name,
  address,
  city,
  state,
  zip,
  phone,
  email,
  country,
  website,
) => {
  await prisma.company.upsert({
    where: {
      name,
    },
    update: {},
    create: {
      name,
      address,
      city,
      state,
      zip,
      phone,
      email,
      country,
      website,
    }
  });
};

module.exports = {
  createCompany,
};
