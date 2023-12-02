function createServiceData(
  date,
  time,
  duration,
  serviceType,
  status,
  costs,
) {
  return { 
    date,
    time,
    duration,
    serviceType,
    status,
    costs,
  };
;}

export default createServiceData;