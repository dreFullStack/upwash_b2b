const express = require('express');
const { isAuthenticated } = require('../../middlewares');

const router = express.Router();

const {
  findFleetManagerByUserId,
  getInvoiceInfoByFleetManagerId,
  createInvoiceInfo
} = require('./invoices.services');

router.get('/invoiceInfo', isAuthenticated, async (req, res, next) => {
  try {
    // get userId and fetch fleetManager
    const { userId } = req.payload;
    const fleetManager = await findFleetManagerByUserId(userId);

    // get invoicing info using fleetManagerId
    const invoicingInfo = await getInvoiceInfoByFleetManagerId(fleetManager.id);
    console.log('invoicingInfo => ', invoicingInfo);

    return res.json(invoicingInfo);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/newInvoiceInfo', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;

    console.log('req.body => ', req.body);

    const {
      companyName,
      companyNumber,
      companyAddress,
      companyPostCode,
      contactPersonName,
      contactPersonNumber,
      deliveryType,
      verkkolaskutusosoite,
      operaattoritunnus,
      email,
      invoicingAddress,
      invoicingPostCode
    } = req.body;

    const fleetManager = await findFleetManagerByUserId(userId);

    try {
      const newInvoiceInfo = await createInvoiceInfo({
        fleetManagerId: fleetManager.id,
        companyName,
        companyNumber,
        companyAddress,
        companyPostCode,
        contactPersonName,
        contactPersonNumber,
        deliveryType,
        verkkolaskutusosoite,
        operaattoritunnus,
        email,
        invoicingAddress,
        invoicingPostCode
      });

      return res.status(200).json(newInvoiceInfo);
    } catch (err) {
      console.error(err);
      // TODO: handle error properly
      return res.status(400).json({
        message: 'some error occurred'
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
