const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Seeders
const { main: seedUsers } = require('./seeders/users/users');
const { main: seedCompanies } = require('./seeders/companies/companies');
const { main: seedVehicleCategories } = require('./seeders/vehicle-categories/vehicle-categories');
const { main: seedFleetManagers } = require('./seeders/fleet-managers/fleet-managers');
const { main: seedFleets } = require('./seeders/fleets/fleets');
const { main: seedWashServices } = require('./seeders/service-categories/wash-services');

async function main() {
  // Seed test users
  await seedUsers();

  // Seed test companies
  await seedCompanies();

  // Seed fleet managers
  await seedFleetManagers();

  // Seed vehicle categories
  await seedVehicleCategories();

  // Seed fleets
  await seedFleets();

  // Seed service categories
  await seedWashServices();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
