const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  findAllVehiclesCategories,
  addVehicleToFleet,
  updateVehicle,
  findVehiclesByLicensePlate,
  findVehiclesByVin,
  getFleetVehiclesCount,
  findVehicleTypeByCode,
  getFleetVehiclesDistribution,
  checkVehicleExists,
  getVehicleInfo,
} = require('./vehicles.services');

const {
  userHasAccessToFleet,
  userHasAccessToVehicle
} = require('../users/users.services');

const router = express.Router();

const parseCSV = require('../../utils/parseCSV');

router.get('/vehiclesCategories', isAuthenticated, async (req, res, next) => {
  try {
    const vehiclesTypes = await findAllVehiclesCategories();
    res.json(vehiclesTypes);
  } catch (err) {
    next(err);
  }
});

router.post('/newVehicle', isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;

  const {
    name,
    licensePlate,
    country,
    color,
    vin,
    make,
    year,
    model,
    location,
    vehicleTypeId,
    fleetId,
  } = req.body;

  // verify that fleet belongs to this user
  const hasAccess = await userHasAccessToFleet(userId, fleetId);

  if (!hasAccess) {
    return res.status(403).json({
      message: 'Aceess to this fleet is denied',
      errorType: 'accessToFleetDenied',
    });
  }

  // Check if vehicle with this license plate already exists
  const vehiclesWithLicensePlate = await findVehiclesByLicensePlate(licensePlate);

  if (licensePlate.trim() !== '' && vehiclesWithLicensePlate.length > 0) {
    return res.status(409).json({
      message: 'Vehicle with this license plate already exists',
      errorType: 'nonUniqueLicensePlate'
    });
  }

  // Check if vehicle with this vin already exists
  const vehiclesWithVin = await findVehiclesByVin(vin);

  if (vin.trim() !== '' && vehiclesWithVin.length > 0) {
    return res.status(409).json({
      message: 'Vehicle with this vin already exists',
      errorType: 'nonUniqueVin'
    });
  }

  const fleetVehiclesCount = await getFleetVehiclesCount(fleetId);

  // TODO: move this to config
  if (fleetVehiclesCount >= 500) {
    return res.status(403).json({
      message: 'Fleet has reached maximum number of vehicles',
      errorType: 'maxFleetVehiclesReached'
    });
  }

  try {
    const newVehicle = await addVehicleToFleet({
      name,
      licensePlate,
      country,
      color,
      vin,
      make,
      year,
      model,
      location,
      vehicleTypeId,
      fleetId,
    });

    return res.status(200).json(newVehicle);
  } catch (err) {
    next(err);
  }

  return null;
});

router.put('/updateVehicle', isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;

  const {
    vehicleId,
    name,
    licensePlate,
    country,
    color,
    vin,
    make,
    year,
    model,
    vehicleTypeId,
    fleetId,
  } = req.body;

  // verify that fleet belongs to this user
  const hasAccess = await userHasAccessToFleet(userId, fleetId);

  if (!hasAccess) {
    return res.status(403).json({
      message: 'Aceess to this fleet is denied',
      errorType: 'accessToFleetDenied',
    });
  };
  
  try {
    const updatedVehicle = await updateVehicle({
      vehicleId,
      name,
      licensePlate,
      country,
      color,
      vin,
      make,
      year,
      model,
      vehicleTypeId,
      fleetId
    });

    res.status(200).json(updatedVehicle);
  } catch (err) {
    console.log(err);
    next(err);
  };
});

router.post('/bulkImport', isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;

  const {
    vehiclesData,
    fleetId,
  } = req.body;

  // TODO: this is a hack, need to figure out why csv parser `columns` option is not working
  // Add header to csv data
  const newVehiclesData = `type,name,licensePlate,country,color,vin,make,year,model,location
    ${vehiclesData.trim()}`;

  // verify that fleet belongs to this user
  const hasAccess = await userHasAccessToFleet(userId, fleetId);

  if (!hasAccess) {
    return res.status(403).json({
      message: 'Access to this fleet is denied',
      errorType: 'accessToFleetDenied',
    });
  }

  try {
    const parsedCSV = await parseCSV(newVehiclesData);

    console.log('parsedCSV -> ', parsedCSV);

    // Validate vehicles
    await Promise.all(
      parsedCSV.map(async (vehicle) => {
        const {
          type,
          licensePlate,
          vin,
        } = vehicle;

        // Check if vehicle with this license plate already exists
        const vehiclesWithLicensePlate = await findVehiclesByLicensePlate(licensePlate);

        if (licensePlate.trim() !== '' && vehiclesWithLicensePlate.length > 0) {
          const error = new Error('Vehicle with this license plate already exists');
          error.errorType = 'nonUniqueLicensePlate';
          error.vehicle = vehicle;

          throw error;
        }

        // Check if vehicle with this vin already exists
        const vehiclesWithVin = await findVehiclesByVin(vin);

        if (vin.trim() !== '' && vehiclesWithVin.length > 0) {
          const error = new Error('Vehicle with this vin already exists');
          error.errorType = 'nonUniqueVin';
          error.vehicle = vehicle;

          throw error;
        }

        const vehicleType = await findVehicleTypeByCode(type.trim());

        if (!vehicleType) {
          const error = new Error('Vehicle type not found');

          error.errorType = 'invalidVehicleType';
          error.vehicle = vehicle;

          throw error;
        }
      })
    );

    // Check fleet will reach maximum number of vehicles after adding new vehicles
    const fleetVehiclesCount = await getFleetVehiclesCount(fleetId);

    if (fleetVehiclesCount >= 500) {
      return res.status(403).json({
        message: 'Fleet has reached maximum number of vehicles',
        errorType: 'maxFleetVehiclesReached'
      });
    }

    if (fleetVehiclesCount + parsedCSV.length > 500) {
      return res.status(403).json({
        message: 'Fleet will reach maximum number of vehicles after adding new vehicles',
        errorType: 'maxFleetVehiclesReached'
      });
    }

    // Add vehicles to fleet
    await Promise.all(
      parsedCSV.map(async (vehicle) => {
        const {
          type,
          name,
          licensePlate,
          country,
          color,
          vin,
          make,
          year,
          model,
          location,
        } = vehicle;

        const vehicleType = await findVehicleTypeByCode(type.trim());
        const vehicleTypeId = vehicleType.id;

        await addVehicleToFleet({
          name,
          licensePlate,
          country,
          color,
          vin,
          make,
          year,
          model,
          location,
          vehicleTypeId,
          fleetId,
        });
      })
    );

    res.status(200).json({
      message: 'Vehicles added successfully',
    });
  } catch (err) {
    if (err.errorType === 'nonUniqueLicensePlate') {
      return res.status(409).json({
        message: 'Vehicle with this license plate already exists',
        errorType: 'nonUniqueLicensePlate',
        vehicle: err.vehicle,
      });
    }

    if (err.errorType === 'nonUniqueVin') {
      return res.status(409).json({
        message: 'Vehicle with this vin already exists',
        errorType: 'nonUniqueVin',
        vehicle: err.vehicle,
      });
    }

    if (err.errorType === 'invalidVehicleType') {
      return res.status(400).json({
        message: 'Invalid vehicle type',
        errorType: 'invalidVehicleType',
        vehicle: err.vehicle,
      });
    }

    next(err);
  }

  return null;
});

router.get('/fleetVehiclesCount', isAuthenticated, async (req, res, next) => {
  try {
    const { fleetId } = req.query;
    const { userId } = req.payload;

    // Verify that fleet belongs to this user
    const hasAccess = await userHasAccessToFleet(+userId, +fleetId);

    if (!hasAccess) {
      return res.status(403).json({
        message: 'Aceess to this fleet is denied',
      });
    }

    const fleetVehiclesCount = await getFleetVehiclesCount(+fleetId);

    return res.status(200).json(fleetVehiclesCount);
  } catch (err) {
    next(err);
  }

  return null;
});

router.get('/fleetVehiclesDistribution', isAuthenticated, async (req, res, next) => {
  try {
    const { fleetId } = req.query;
    const { userId } = req.payload;

    // Verify that fleet belongs to this user
    const hasAccess = await userHasAccessToFleet(+userId, +fleetId);

    if (!hasAccess) {
      return res.status(403).json({
        message: 'Aceess to this fleet is denied',
      });
    }

    const fleetVehiclesDistribution = await getFleetVehiclesDistribution(+fleetId);

    return res.status(200).json(fleetVehiclesDistribution);
  } catch (err) {
    next(err);
  }

  return null;
});

router.get('/vehicleInfo', isAuthenticated, async (req, res, next) => {
  try {
    const { vehicleId } = req.query;

    // Verify that vehicle exists
    const vehicleExists = await checkVehicleExists(+vehicleId);

    if (!vehicleExists) {
      console.log('!vehicleExists');
      return res.status(404).json({
        message: 'Vehicle not found',
      });
    }

    // Verify that user has access to this vehicle
    const hasAccess = await userHasAccessToVehicle(req.payload.userId, +vehicleId);

    if (!hasAccess) {
      return res.status(403).json({
        message: 'Access to this vehicle is denied',
      });
    }

    const vehicleInfo = await getVehicleInfo(+vehicleId);

    return res.status(200).json(vehicleInfo);
  } catch (err) {
    console.log(err);
    next(err);
  }

  return null;
});

router.get('/vehicleServices', isAuthenticated, async (req, res, next) => {
  try {
    const { vehicleId } = req.query;

    // Verify that vehicle exists
    const vehicleExists = await checkVehicleExists(+vehicleId);

    if (!vehicleExists) {
      console.log('!vehicleExists');
      return res.status(404).json({
        message: 'Vehicle not found',
      });
    }

    // Verify that user has access to this vehicle
    const hasAccess = await userHasAccessToVehicle(req.payload.userId, +vehicleId);

    if (!hasAccess) {
      return res.status(403).json({
        message: 'Access to this vehicle is denied',
      });
    }

    // Get vehicle services
    const vehicleServices = await getVehicleServices(+vehicleId);

    return res.status(200).json(vehicleServices);
  } catch (err) {
    next(err);
  }

  return null;
});

router.get('/fleetVehiclesOfSameType', isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;
  const { vehicleId } = req.query;

  // Verify that user has access to this vehicle
  const hasAccess = await userHasAccessToVehicle(+userId, +vehicleId);
  if (!hasAccess) {
    return res.status(403).json({
      message: 'Access to this vehicle is denied',
    });
  }

  const vehicleInfo = await getVehicleInfo(+vehicleId);

  const { fleetId, vehicleTypeId } = vehicleInfo;

  const vehiclesOfSameType = await db.vehicle.findMany({
    where: {
      fleetId,
      vehicleTypeId,
      NOT: {
        id: +vehicleId,
      },
      deletedAt: null,
    },
  });

  return res.status(200).json(vehiclesOfSameType);
});

router.delete('/:vehicleId', isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;
  const { vehicleId } = req.params;

  console.log('vehicleId -> ', vehicleId);

  // Verify that user has access to this vehicle
  const hasAccess = await userHasAccessToVehicle(+userId, +vehicleId);
  if (!hasAccess) {
    return res.status(403).json({
      message: 'Access to this vehicle is denied',
    });
  }

  try {
    await softDeleteVehicle(+vehicleId);

    return res.status(200).json({
      message: 'Vehicle deleted successfully',
    });
  } catch (err) {
    next(err);
  }

  return null;
});

module.exports = router;
