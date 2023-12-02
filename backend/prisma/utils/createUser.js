const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const createUser = async (
  email,
  password,
) => {
  await prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      email,
      password: bcrypt.hashSync(password, 12),
    },
  });
};

module.exports = {
  createUser,
};
