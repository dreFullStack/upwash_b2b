const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.serviceCategory.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      // Service category
      code: 'wash-services',
      name: 'Wash services',
      services: {
        create: [
          {
            // Service
            code: 'basic-indoor-and-outdoor-wash',
            name: 'Perus sisä- ja ulkopesu',
            description: `The "Basic Indoor and Outdoor Wash" 
is a comprehensive car washing service that 
thoroughly cleans and refreshes both the interior and 
exterior of your vehicle, leaving it spotless and rejuvenated.`,
            price: {
              create: [
                // Excavators
                {
                  // Price for specific vehicle type
                  price: 99,
                  currency: 'EUR',
                  duration: 120,
                  vehicleType: {
                    connect: {
                      code: 'excavator-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 199,
                  currency: 'EUR',
                  duration: 120,
                  vehicleType: {
                    connect: {
                      code: 'excavator-large',
                    },
                  },
                },

                // Trucks
                {
                  // Price for specific vehicle type
                  price: 119,
                  currency: 'EUR',
                  duration: 80,
                  vehicleType: {
                    connect: {
                      code: 'truck-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 124,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'truck-large',
                    },
                  },
                },

                // Vans
                {
                  // Price for specific vehicle type
                  price: 49,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'van-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 69,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'van-large',
                    },
                  },
                },

                // Passenger cars
                {
                  // Price for specific vehicle type
                  price: 59,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'passenger-car',
                    },
                  },
                },
              ],
            },
          },
          {
            // Service
            code: 'premium-indoor-and-outdoor-wash',
            name: 'Premium sisä- ja ulkopesu',
            description: `The "Premium Indoor and Outdoor Wash" is an 
all-inclusive car washing service that provides
meticulous cleaning and rejuvenation for 
both the interior and exterior of your vehicle, 
ensuring a spotless and refreshed appearance.`,
            price: {
              create: [
                // Excavators
                {
                  // Price for specific vehicle type
                  price: 149,
                  currency: 'EUR',
                  duration: 180,
                  vehicleType: {
                    connect: {
                      code: 'excavator-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 180,
                  currency: 'EUR',
                  duration: 180,
                  vehicleType: {
                    connect: {
                      code: 'excavator-large',
                    },
                  },
                },

                // Trucks
                {
                  // Price for specific vehicle type
                  price: 159,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'truck-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 159,
                  currency: 'EUR',
                  duration: 120,
                  vehicleType: {
                    connect: {
                      code: 'truck-large',
                    },
                  },
                },

                // Vans
                {
                  // Price for specific vehicle type
                  price: 99,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'van-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 109,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'van-large',
                    },
                  },
                },

                // Passenger cars
                {
                  // Price for specific vehicle type
                  price: 99,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'passenger-car',
                    },
                  },
                },
              ],
            },
          },
          {
            // Service
            code: 'luxury-indoor-and-outdoor-wash',
            name: 'Luksus sisä- ja ulkopesu',
            description: `The "Luxury Indoor and Outdoor Wash" is an 
exclusive car washing service that provides meticulous cleaning 
and revitalization for both the interior and exterior of your 
vehicle, leaving it immaculate and rejuvenated to the highest standard of luxury.`,
            price: {
              create: [
                // Excavators
                {
                  // Price for specific vehicle type
                  price: 240,
                  currency: 'EUR',
                  duration: 240,
                  vehicleType: {
                    connect: {
                      code: 'excavator-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 240,
                  currency: 'EUR',
                  duration: 240,
                  vehicleType: {
                    connect: {
                      code: 'excavator-large',
                    },
                  },
                },

                // Trucks
                {
                  // Price for specific vehicle type
                  price: 249,
                  currency: 'EUR',
                  duration: 120,
                  vehicleType: {
                    connect: {
                      code: 'truck-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 299,
                  currency: 'EUR',
                  duration: 150,
                  vehicleType: {
                    connect: {
                      code: 'truck-large',
                    },
                  },
                },

                // Vans
                {
                  // Price for specific vehicle type
                  price: 189,
                  currency: 'EUR',
                  duration: 120,
                  vehicleType: {
                    connect: {
                      code: 'van-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 189,
                  currency: 'EUR',
                  duration: 120,
                  vehicleType: {
                    connect: {
                      code: 'van-large',
                    },
                  },
                },

                // Passenger cars
                {
                  // Price for specific vehicle type
                  price: 189,
                  currency: 'EUR',
                  duration: 120,
                  vehicleType: {
                    connect: {
                      code: 'passenger-car',
                    },
                  },
                },
              ],
            },
          },
          {
            // Service
            code: 'basic-outdoor-wash',
            name: 'Perus ulkopesu',
            description: `
            The "Basic Outdoor Wash" is a comprehensive car 
washing service that focuses on the meticulous cleaning and rejuvenation 
of your vehicle's exterior, ensuring a thorough and refreshed appearance.`,
            price: {
              create: [
                // Excavators
                {
                  // Price for specific vehicle type
                  price: 59,
                  currency: 'EUR',
                  duration: 40,
                  vehicleType: {
                    connect: {
                      code: 'excavator-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 99,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'excavator-large',
                    },
                  },
                },

                // Trucks
                {
                  // Price for specific vehicle type
                  price: 69,
                  currency: 'EUR',
                  duration: 30,
                  vehicleType: {
                    connect: {
                      code: 'truck-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 89,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'truck-large',
                    },
                  },
                },

                // Vans
                {
                  // Price for specific vehicle type
                  price: 34,
                  currency: 'EUR',
                  duration: 40,
                  vehicleType: {
                    connect: {
                      code: 'van-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 39,
                  currency: 'EUR',
                  duration: 30,
                  vehicleType: {
                    connect: {
                      code: 'van-large',
                    },
                  },
                },

                // Passenger cars
                {
                  // Price for specific vehicle type
                  price: 34,
                  currency: 'EUR',
                  duration: 30,
                  vehicleType: {
                    connect: {
                      code: 'passenger-car',
                    },
                  },
                },
              ],
            },
          },
          {
            // Service
            code: 'premium-outdoor-wash',
            name: 'Premium ulkopesu',
            description: `The "Premium Outdoor Wash" is an all-inclusive 
car washing service that prioritizes the meticulous 
cleaning and revitalization of your vehicle's exterior, 
delivering a thorough and refreshed appearance with exceptional attention to detail.`,
            price: {
              create: [
                // Excavators
                {
                  // Price for specific vehicle type
                  price: 99,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'excavator-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 150,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'excavator-large',
                    },
                  },
                },

                // Trucks
                {
                  // Price for specific vehicle type
                  price: 99,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'truck-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 119,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'truck-large',
                    },
                  },
                },

                // Vans
                {
                  // Price for specific vehicle type
                  price: 59,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'van-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 69,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'van-large',
                    },
                  },
                },

                // Passenger cars
                {
                  // Price for specific vehicle type
                  price: 49,
                  currency: 'EUR',
                  duration: 50,
                  vehicleType: {
                    connect: {
                      code: 'passenger-car',
                    },
                  },
                },
              ],
            },
          },
          {
            // Service
            code: 'luxury-outdoor-wash',
            name: 'Luksus ulkopesu',
            description: `The "Luxury Outdoor Wash" is an 
exclusive car washing service that offers top-tier cleaning and 
revitalization for your vehicle's exterior, ensuring a meticulously 
detailed and refreshed appearance with a touch of luxury.`,
            price: {
              create: [
                // Excavators
                {
                  // Price for specific vehicle type
                  price: 149,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'excavator-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 199,
                  currency: 'EUR',
                  duration: 120,
                  vehicleType: {
                    connect: {
                      code: 'excavator-large',
                    },
                  },
                },

                // Trucks
                {
                  // Price for specific vehicle type
                  price: 149,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'truck-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 199,
                  currency: 'EUR',
                  duration: 120,
                  vehicleType: {
                    connect: {
                      code: 'truck-large',
                    },
                  },
                },

                // Vans
                {
                  // Price for specific vehicle type
                  price: 99,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'van-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 99,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'van-large',
                    },
                  },
                },

                // Passenger cars
                {
                  // Price for specific vehicle type
                  price: 89,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'passenger-car',
                    },
                  },
                },
              ],
            },
          },
          {
            // Service
            code: 'basic-indoor-wash',
            name: 'Perus sisäpesu',
            description: `The "Basic Indoor Wash" 
is a comprehensive car interior cleaning service 
that focuses on meticulous attention to detail, 
leaving your vehicle's inside spotless, fresh, and thoroughly rejuvenated.`,
            price: {
              create: [
                // Excavators
                {
                  // Price for specific vehicle type
                  price: 39,
                  currency: 'EUR',
                  duration: 40,
                  vehicleType: {
                    connect: {
                      code: 'excavator-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 39,
                  currency: 'EUR',
                  duration: 30,
                  vehicleType: {
                    connect: {
                      code: 'excavator-large',
                    },
                  },
                },

                // Trucks
                {
                  // Price for specific vehicle type
                  price: 39,
                  currency: 'EUR',
                  duration: 40,
                  vehicleType: {
                    connect: {
                      code: 'truck-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 39,
                  currency: 'EUR',
                  duration: 40,
                  vehicleType: {
                    connect: {
                      code: 'truck-large',
                    },
                  },
                },

                // Vans
                {
                  // Price for specific vehicle type
                  price: 39,
                  currency: 'EUR',
                  duration: 40,
                  vehicleType: {
                    connect: {
                      code: 'van-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 39,
                  currency: 'EUR',
                  duration: 40,
                  vehicleType: {
                    connect: {
                      code: 'van-large',
                    },
                  },
                },

                // Passenger cars
                {
                  // Price for specific vehicle type
                  price: 39,
                  currency: 'EUR',
                  duration: 40,
                  vehicleType: {
                    connect: {
                      code: 'passenger-car',
                    },
                  },
                },
              ],
            },
          },
          {
            // Service
            code: 'premium-indoor-wash',
            name: 'Premium sisäpesu',
            description: `The "Premium Indoor Wash" is an all-inclusive car 
interior cleaning service that goes above and beyond in meticulous attention 
to detail, providing a comprehensive refreshment that leaves your vehicle's interior 
immaculate, fresh, and revitalized to the highest standard.`,
            price: {
              create: [
                // Excavators
                {
                  // Price for specific vehicle type
                  price: 69,
                  currency: 'EUR',
                  duration: 70,
                  vehicleType: {
                    connect: {
                      code: 'excavator-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 89,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'excavator-large',
                    },
                  },
                },

                // Trucks
                {
                  // Price for specific vehicle type
                  price: 84,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'truck-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 84,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'truck-large',
                    },
                  },
                },

                // Vans
                {
                  // Price for specific vehicle type
                  price: 84,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'van-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 84,
                  currency: 'EUR',
                  duration: 60,
                  vehicleType: {
                    connect: {
                      code: 'van-large',
                    },
                  },
                },

                // Passenger cars
                {
                  // Price for specific vehicle type
                  price: 84,
                  currency: 'EUR',
                  duration: 90,
                  vehicleType: {
                    connect: {
                      code: 'passenger-car',
                    },
                  },
                },
              ],
            },
          },
          {
            // Service
            code: 'luxury-indoor-wash',
            name: 'Luksus sisäpesu',
            description: `The "Luxury Indoor Wash" is an exclusive 
and opulent car interior cleaning service that provides an unparalleled 
level of meticulous attention to detail, ensuring your vehicle's 
inside is transformed into a pristine, lavish, and rejuvenated space, 
exceeding all expectations of luxury.`,
            price: {
              create: [
                // Excavators
                {
                  // Price for specific vehicle type
                  price: 104,
                  duration: 120,
                  currency: 'EUR',
                  vehicleType: {
                    connect: {
                      code: 'excavator-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 149,
                  duration: 120,
                  currency: 'EUR',
                  vehicleType: {
                    connect: {
                      code: 'excavator-large',
                    },
                  },
                },

                // Trucks
                {
                  // Price for specific vehicle type
                  price: 159,
                  duration: 120,
                  currency: 'EUR',
                  vehicleType: {
                    connect: {
                      code: 'truck-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 184,
                  duration: 120,
                  currency: 'EUR',
                  vehicleType: {
                    connect: {
                      code: 'truck-large',
                    },
                  },
                },

                // Vans
                {
                  // Price for specific vehicle type
                  price: 149,
                  duration: 120,
                  currency: 'EUR',
                  vehicleType: {
                    connect: {
                      code: 'van-small',
                    },
                  },
                },
                {
                  // Price for specific vehicle type
                  price: 149,
                  duration: 120,
                  currency: 'EUR',
                  vehicleType: {
                    connect: {
                      code: 'van-large',
                    },
                  },
                },

                // Passenger cars
                {
                  // Price for specific vehicle type
                  price: 149,
                  duration: 120,
                  currency: 'EUR',
                  vehicleType: {
                    connect: {
                      code: 'passenger-car',
                    },
                  },
                },
              ],
            },
          }
        ],
      },
    },
  });
}

module.exports = {
  main,
};
