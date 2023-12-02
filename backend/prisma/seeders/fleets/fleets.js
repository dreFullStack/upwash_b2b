const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.fleet.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: 'Fleet 1',
      adress: 'Kuormakatu 1',
      city: 'Helsinki',
      state: 'Uusimaa',
      zip: '00100',
      country: 'Finland',
      vehicles: {
        create: [
          {
            name: 'Truck 1',
            vehicleType: {
              connect: {
                code: 'truck-small',
              },
            },
            licensePlate: 'ABC-123',
            country: 'Finland',
            vin: '12345678901234567',
            color: 'red',
            make: 'Volvo',
            model: 'FH16',
            year: 2020,
          },
          {
            name: 'Truck 2',
            vehicleType: {
              connect: {
                code: 'truck-large',
              },
            },
            licensePlate: 'ABC-234',
            country: 'Finland',
            vin: '12345678901234560',
            color: 'blue',
            make: 'Volvo',
            model: 'FH16',
            year: 2020,
          },
          {
            name: 'Truck 3',
            vehicleType: {
              connect: {
                code: 'truck-large',
              },
            },
            licensePlate: 'ABC-257',
            country: 'Finland',
            vin: '1234567471234560',
            color: 'blue',
            make: 'Volvo',
            model: 'FH16',
            year: 2020,
          }
        ]
      },
      company: {
        connect: {
          name: 'Power Trucks Oy',
        },
      },
    },
  });

  await prisma.fleet.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      name: 'Fleet 2',
      adress: 'Kuormakatu 2',
      city: 'Tampere',
      state: 'Tampere',
      zip: '00200',
      country: 'Finland',
      vehicles: {
        create: [
          // Specific vehicle
          {
            name: 'Truck 2',
            vehicleType: {
              connect: {
                code: 'truck-small',
              },
            },
            licensePlate: 'ABC-323',
            country: 'Finland',
            vin: '123456878901234522',
            color: 'red',
            make: 'Volvo',
            model: 'FH16',
            year: 2020,
          },
          // Specific vehicle
          {
            name: 'Truck 4',
            vehicleType: {
              connect: {
                code: 'truck-large',
              },
            },
            licensePlate: 'ABC-44',
            country: 'Finland',
            vin: '123456789801234460',
            color: 'blue',
            make: 'Volvo',
            model: 'FH16',
            year: 2020,
          }
        ]
      },
      company: {
        connect: {
          name: 'Power Trucks Oy',
        },
      },
    },
  });
}

module.exports = {
  main,
};
