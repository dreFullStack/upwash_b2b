const { createCompany } = require('../../utils/createCompany');

async function main() {
  await createCompany('Power Trucks Oy', 'Kuormakatu 1', 'Helsinki', 'Uusimaa', '00100', '0401234567', 'some.email@test.com', 'Finland', 'www.powertrucks.fi');
  await createCompany('TechSolutions Ltd.', 'Innovation Avenue', 'San Francisco', 'California', '94101', '+1 123-456-7890', 'info@techsolutions.com', 'United States', 'www.techsolutions.com');
  await createCompany('EcoGreen Foods', 'Sustainable Street', 'London', 'England', 'SW1A 1AA', '+44 1234 567890', 'info@ecogreenfoods.com', 'United Kingdom', 'www.ecogreenfoods.co.uk');
}

module.exports = {
  main,
};
