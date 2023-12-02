function calculatePrice(selectedService, attachedVehicles=[]){

  const vehiclesCount = attachedVehicles.length+1;

  const basicPrice = selectedService.price * (vehiclesCount);
  
  if(vehiclesCount>=10){
    return basicPrice*0.80
  }
  else if(vehiclesCount>=3){
    return basicPrice*0.85;
  }

  return basicPrice;

}

export default calculatePrice;