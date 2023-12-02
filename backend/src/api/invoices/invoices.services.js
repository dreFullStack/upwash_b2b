const { db } = require('../../utils/db');

function findFleetManagerByUserId(userId) {
  return db.fleetManager.findUnique({
    where: {
      userId
    }
  });
}

function getInvoiceInfoByFleetManagerId(fleetManagerId) {
  return db.invoiceInfo.findUnique({
    where: {
      fleetManagerId
    }
  });
}

function createInvoiceInfo({
  fleetManagerId,
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
}) {
  return db.invoiceInfo.upsert({
    where: {
      fleetManagerId
    },
    update: {
      fleetManagerId,
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
    },
    create: {
      fleetManager: {
        connect: {
          id: fleetManagerId
        }
      },
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
    }
  });
}

module.exports = {
  findFleetManagerByUserId,
  getInvoiceInfoByFleetManagerId,
  createInvoiceInfo,
};
