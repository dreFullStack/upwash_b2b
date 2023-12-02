const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  findUserById,
  findFleetManagerByUserId,
  findCompanyById,
} = require('./users.services');

const router = express.Router();

router.get('/userInfo', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      role: user.role,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/fleetManagerInfo', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;

    const {
      vehiclesSkip,
      vehiclesTake
    } = req.query;

    console.log('[!!!] vehiclesSkip -> ', vehiclesSkip);
    console.log('[!!!] vehiclesTake -> ', vehiclesTake);

    // const fleetManager = await findFleetManagerByUserId(userId, +vehiclesSkip, +vehiclesTake);
    const fleetManager = await findFleetManagerByUserId(userId, +vehiclesSkip, +vehiclesTake);
    res.json(fleetManager);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/companyInfo', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const fleetManager = await findFleetManagerByUserId(userId);
    const company = await findCompanyById(fleetManager.companyId);
    res.json({
      id: company.id,
      name: company.name,
      address: company.address,
      phone: company.phone,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
