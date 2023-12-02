const restructureVehicleServices = (vehicleServices) => {

  console.log("restructureVehicleServices; vehicleServices -> ", vehicleServices);

  if(!vehicleServices) return null;

  let result = [];

  for (let i = 0; i < vehicleServices.length; i++) {
    const price    = vehicleServices[i].price;
    const duration = vehicleServices[i].duration;
    const service  = vehicleServices[i].service;
    
    const serviceCategory = service.serviceCategory;

    // Check if the service category already exists in the result array
    const serviceCategoryIndex = result.findIndex(item => item.categoryCode === serviceCategory.code);

    if (serviceCategoryIndex !== -1) {

      const existingServiceCategory = result[serviceCategoryIndex];
      
      existingServiceCategory.services.push({
        code: service.code,
        name: service.name,
        description: service.description,
        price: price,
        duration: duration,
      });

    }
    else{

      result.push({
        categoryCode: serviceCategory.code,
        categoryName: serviceCategory.name,
        services: [
          {
            code:  service.code,
            name:  service.name,
            description: service.description,
            price: price,
            duration: duration,
          }
        ]
      });

    }

  }

  return result;

}

export default restructureVehicleServices;