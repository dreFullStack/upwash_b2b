const express = require('express');

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const vehicles = require('./vehicles/vehicles.routes');
const support = require('./support/support.routes');
const scheduling = require('./scheduling/scheduling.routes');
const order = require('./order/order.routes');
const invoices = require('./invoices/invoices.routes');
const fleets = require('./fleets/fleets.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/vehicles', vehicles);
router.use('/support', support);
router.use('/scheduling', scheduling);
router.use('/order', order);
router.use('/invoices', invoices);
router.use('/fleets', fleets);

module.exports = router;
