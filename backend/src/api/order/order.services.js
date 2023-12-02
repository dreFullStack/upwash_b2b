const { db } = require('../../utils/db');

function calculateOrderPrice(servicePrice, vehiclesCount) {
  const basicPrice = servicePrice * (vehiclesCount);

  if (vehiclesCount >= 10) {
    return basicPrice * 0.80;
  }
  if (vehiclesCount >= 3) {
    return basicPrice * 0.85;
  }

  return basicPrice;
}

function createNewOrder({
  duration,
  price,
  fleetManagerId,
  vehicleIds,
  serviceCode,
  date,
  time,
  contactPersonName,
  contactPersonPhone,
  location,
  additionalInfo,
}) {
  return db.order.create({
    data: {
      duration,
      price,
      date,
      time,
      fleetManager: {
        connect: { id: fleetManagerId },
      },
      vehicles: {
        connect: vehicleIds.map((id) => ({ id })),
      },
      service: {
        connect: { code: serviceCode },
      },
      contactPersonName,
      contactPersonPhone,
      location,
      additionalInfo,
    }
  });
}

function findOrdersByFleetManagerId(fleetManagerId, skip = 0, take = 25) {
  return db.order.findMany({
    where: {
      fleetManagerId,
    },
    include: {
      vehicles: {
        include: {
          vehicleType: true,
        }
      },
      service: true,
    },
    skip,
    take,
  });
}

function getOrdersCountByFleetManagerId(fleetManagerId) {
  return db.order.count({
    where: {
      fleetManagerId,
    },
  });
}

module.exports = {
  calculateOrderPrice,
  createNewOrder,
  findOrdersByFleetManagerId,
  getOrdersCountByFleetManagerId
};
