const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  fetchAvailableTimes,
} = require('./scheduling.services');

const router = express.Router();

router.get('/availableTimes', isAuthenticated, async (req, res, next) => {
  try {
    const { duration } = req.query;
    // TODO: handle situation if availableTimes fetch fails
    const availableTimes = await fetchAvailableTimes(duration);
    res.json(availableTimes);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
