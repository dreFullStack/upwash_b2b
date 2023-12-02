const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

function findFleetManagerByUserId(userId, vehiclesSkip = 0, vehiclesTake = 10) {
  return db.fleetManager.findUnique({
    where: {
      userId,
    },
    include: {
      company: {
        include: {
          fleets: {
            include: {
              vehicles: {
                include: {
                  vehicleType: true,
                },
                skip: vehiclesSkip,
                take: vehiclesTake,
                // where: {
                //   deletedAt: null,
                // }
              },
            },
          }
        }
      }
    }
  });
}

function findCompanyById(id) {
  return db.company.findUnique({
    where: {
      id,
    },
  });
}

async function userHasAccessToFleet(userId, fleetId) {
  const fleetManagerData = await db.fleetManager.findUnique({
    where: {
      userId,
    },
    include: {
      company: {
        include: {
          fleets: {
            select: {
              id: true,
            }
          }
        }
      }
    }
  });

  const fleetIds = fleetManagerData.company.fleets.map((fleet) => fleet.id);

  return fleetIds.includes(fleetId);
}

async function userHasAccessToVehicle(userId, vehicleId) {
  // console.log('userHasAccessToVehicle; userId = ', userId);
  // console.log('userHasAccessToVehicle; vehicleId = ', vehicleId);

  const fleetManagerData = await db.fleetManager.findUnique({
    where: {
      userId,
    },
    include: {
      company: {
        include: {
          fleets: {
            include: {
              vehicles: {
                select: {
                  id: true,
                }
              }
            },
          }
        }
      }
    }
  });
  // console.log('fleetManagerData.company.fleets', fleetManagerData.company.fleets);

  const allFleetsVehiclesIds = fleetManagerData.company.fleets.reduce((acc, fleet) => {
    const fleetVehiclesIds = fleet.vehicles.map((vehicle) => vehicle.id);
    return [...acc, ...fleetVehiclesIds];
  }, []);

  // console.log('allFleetsVehiclesIds', allFleetsVehiclesIds);

  return allFleetsVehiclesIds.includes(vehicleId);
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUserByEmailAndPassword,
  findFleetManagerByUserId,
  findCompanyById,
  userHasAccessToFleet,
  userHasAccessToVehicle,
};
