function generateRandomVehicleData() {
  // Function to generate a random integer within a specified range
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to generate a random string of specified length
  function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Generate a random Vehicle Identification Number (VIN)
  const vin = generateRandomString(17);

  // Generate a random license plate (in the format ABC-123)
  const licensePlate = `${generateRandomString(3)}-${getRandomInt(100, 999)}`;

  // Generate a random vehicle name
  const vehicleNames = ['Toyota Camry', 'Honda Accord', 'Ford F-150', 'Chevrolet Silverado', 'BMW 3 Series'];
  const randomVehicleName = vehicleNames[Math.floor(Math.random() * vehicleNames.length)];

  // Create and return the object with all the random vehicle data
  return {
    vin,
    licensePlate,
    name: randomVehicleName,
    country: 'USA',
    color: 'Black',
    make: 'Toyota',
    year: getRandomInt(2000, 2021),
    model: 'Camry',
    type: 'excavator-small'
  };
}

export default generateRandomVehicleData;