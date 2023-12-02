const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  createNewSupportRequest,
} = require('./support.services');

const router = express.Router();

router.post('/newSupportRequest', isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;

  const {
    title,
    message,
  } = req.body;

  if (!title || !message) {
    return res.status(409).json({
      message: 'One of the required values is missing',
      errorType: 'missingField',
    });
  }

  try {
    const supportRequest = await createNewSupportRequest(title, message, userId);
    res.json(supportRequest);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
