const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  createNewOrder,
  calculateOrderPrice,
  findOrdersByFleetManagerId,
  getOrdersCountByFleetManagerId
} = require('./order.services');

const {
  findFleetManagerByUserId
} = require('../users/users.services');

const {
  tgNotifyCoreTeam
} = require('../../bot/utils');

const {
  getVehicleInfo
} = require('../vehicles/vehicles.services');

const router = express.Router();

router.post('/newOrder', isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;

  const fleetManager = await findFleetManagerByUserId(userId);

  // console.log('fleetManager -> ', fleetManager);

  const {
    selectedService,
    vehicleIds,
    selectedDate,
    selectedTime,
    contactPersonName,
    contactPersonPhone,
    location,
    additionalInfo,
  } = req.body;

  console.log(req.body);

  // if (!selectedService || !vehicles) {
  //   return res.status(409).json({
  //     message: 'Missing fields',
  //     errorType: 'missingField',
  //   });
  // }

  try {
    const duration = selectedService.duration * vehicleIds.length;
    const price = calculateOrderPrice(selectedService.price, vehicleIds.length);

    const newOrder = await createNewOrder({
      duration,
      price,
      fleetManagerId: fleetManager.id,
      selectedService,
      vehicleIds,
      serviceCode: selectedService.code,
      date: selectedDate,
      time: selectedTime,
      contactPersonName,
      contactPersonPhone,
      location,
      additionalInfo,
    });

    const vehiclesInfo = await Promise.all(
      vehicleIds.map((vehicleId) => getVehicleInfo(vehicleId))
    );

    console.log('newOrder -> ', newOrder);

    const messageToCoreTeam = `
Env: ${process.env.NODE_ENV}
New B2B order has been created:

Order ID: ${newOrder.id}

Fleet Manager: ${fleetManager.firstName} ${fleetManager.lastName}
Service: ${selectedService.name}
Vehicles count: ${vehicleIds.length}
Date: ${selectedDate}
Time: ${selectedTime}
Location: test location
Price: ${price} EUR
Duration (mins): ${duration}
Vehicles info: 

${vehiclesInfo.map((vehicle) => `${vehicle.name}: ${vehicle.model} [${vehicle.licensePlate}]`).join('\n')}

Contact person: ${contactPersonName} (${contactPersonPhone})

Additional info: ${additionalInfo}
`;

    await tgNotifyCoreTeam(messageToCoreTeam);

    // TODO: implement logic of automatically putting the reservation into Slotti

    res.json(newOrder);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/fleetManagerOrders', isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;
  const { skip, take } = req.query;

  try {
    const fleetManager = await findFleetManagerByUserId(userId);

    const orders = await findOrdersByFleetManagerId(fleetManager.id, +skip, +take);

    res.json(orders);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/fleetManagerOrdersCount', isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;

  try {
    const fleetManager = await findFleetManagerByUserId(userId);

    const ordersCount = await getOrdersCountByFleetManagerId(fleetManager.id);

    res.json(ordersCount);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
