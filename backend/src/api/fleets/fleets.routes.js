const router              = require("express").Router();
const { isAuthenticated } = require("../../middlewares");

const { 
  createFleetByCompanyId,
  getFleetsByCompanyId
} = require("./fleets.services");
const { findFleetManagerByUserId } = require("../users/users.services");

router.post("/newFleet", isAuthenticated, async (req, res, next) => {
  const { userId } = req.payload;

  const {
    name,
    adress,
    city,
    state,
    zip,
    country
  } = req.body;

  // Checks if user is a fleet manager 
  // returns a companyId
  const fleetManager = await findFleetManagerByUserId(userId);

  if (!fleetManager) {
    return res.status(403).json({
      error: "User is not a fleet manager."
    })
  };

  const fleets = await getFleetsByCompanyId(fleetManager.companyId);
  
  
  const hasMatchingFleet = fleets.some(fleet => {
    return (
      fleet.name === name
    );
  });

  if (hasMatchingFleet) {
    return res.status(409).json({
      errorType: "uniqueNameRequired",
      message: "A fleet with such name already exists. Please, provide a unique name."
    });
  };  

  try {
    const createdFleet = await createFleetByCompanyId(
      name,
      adress,
      city,
      state,
      zip,
      country,
      fleetManager.company.id,
    );

    return res.json(createdFleet);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;