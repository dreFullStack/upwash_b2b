const { db } = require("../../utils/db");

function getFleetsByCompanyId(companyId) {
  return db.fleet.findMany({
    where: {
      companyId
    }
  });
};

function createFleetByCompanyId(
  name,
  adress,
  city,
  state,
  zip,
  country,
  companyId
) {
  return db.fleet.create({
    data: {
      name,
      adress,
      city,
      state,
      zip,
      country,
      companyId
    }
  });
};

module.exports = {
  createFleetByCompanyId,
  getFleetsByCompanyId
};