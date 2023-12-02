const { db } = require('../../utils/db');

function findAllVehiclesCategories() {
  return db.VehicleCategory.findMany({
    include: {
      vehicleTypes: true,
    }
  });
}

async function addVehicleToFleet(vehicleData) {
  const newVehicle = await db.vehicle.create({
    data: {
      name: vehicleData.name,
      licensePlate: vehicleData.licensePlate,
      country: vehicleData.country,
      color: vehicleData.color,
      vin: vehicleData.vin,
      make: vehicleData.make,
      year: +vehicleData.year,
      model: vehicleData.model,
      location: vehicleData.location,
      fleet: {
        connect: { id: +vehicleData.fleetId }
      },
      vehicleType: {
        connect: { id: +vehicleData.vehicleTypeId }
      }
    },
  });
  return newVehicle;
}

function updateVehicle(vehicleData) {
  return db.vehicle.update({
    where: {
      id: vehicleData.vehicleId
    },
    data: {
      name: vehicleData.name,
      licensePlate: vehicleData.licensePlate,
      country: vehicleData.country,
      color: vehicleData.color,
      vin: vehicleData.vin,
      make: vehicleData.make,
      year: vehicleData.year,
      model: vehicleData.model,
      fleet: {
        connect: { id: +vehicleData.fleetId }
      },
      vehicleType: {
        connect: { id: +vehicleData.vehicleTypeId }
      }
    }
  });
}

function findVehiclesByLicensePlate(licensePlate) {
  // TODO: check only vehicles from user's company
  return db.vehicle.findMany({
    where: {
      licensePlate,
    },
    // take: 1
  });
}

function findVehiclesByVin(vin) {
  return db.vehicle.findMany({
    where: {
      vin,
    },
    // take: 1
  });
}

function getFleetVehiclesCount(fleetId) {
  return db.vehicle.count({
    where: {
      fleetId,
    },
  });
}

function findVehicleTypeByCode(code) {
  return db.vehicleType.findUnique({
    where: {
      code,
    },
  });
}

async function getFleetVehiclesDistribution(fleetId) {
  const result = await db.$queryRaw`SELECT vehicletype.code, COUNT(vehicle.vehicleTypeId) AS count
    FROM vehicle
    LEFT JOIN vehicletype ON vehicle.vehicleTypeId = vehicletype.id
    WHERE vehicle.fleetId = ${fleetId}
    GROUP BY vehicle.vehicleTypeId;
  `;

  // Convert `count` to regular number (it is BigInt by default)
  result.forEach((item) => {
    item.count = +(item.count.toString());
  });

  return result;
}

async function checkVehicleExists(vehicleId) {
  const vehicle = await db.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
  });

  return !!vehicle;
}

async function getVehicleInfo(vehicleId) {
  const vehicle = await db.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
    include: {
      vehicleType: true,
      fleet: true,
    },
  });

  return vehicle;
}

async function getVehicleServices(vehicleId) {
  // Get vehicle type id
  const vehicleInfo = await db.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
  });

  if (!vehicleInfo) {
    return null;
  }

  const { vehicleTypeId } = vehicleInfo;

  // Get services for this vehicle type based on the `prices` table
  const prices = await db.price.findMany({
    where: {
      vehicleTypeId,
    },
    include: {
      service: {
        include: {
          serviceCategory: true,
        },
      }
    },
  });

  return prices;
}

const softDeleteVehicle = async (vehicleId) => {
  const deletedVehicle = await db.vehicle.update({
    where: { id: vehicleId },
    data: { deletedAt: new Date() },
  });

  return deletedVehicle;
};

module.exports = {
  findAllVehiclesCategories,
  addVehicleToFleet,
  updateVehicle,
  findVehiclesByLicensePlate,
  findVehiclesByVin,
  getFleetVehiclesCount,
  findVehicleTypeByCode,
  getFleetVehiclesDistribution,
  checkVehicleExists,
  getVehicleInfo
};
