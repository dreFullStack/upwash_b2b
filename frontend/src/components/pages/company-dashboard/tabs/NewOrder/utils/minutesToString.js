function minutesToString(minutes) {
  console.log("minutesToString: minutes = ", minutes);

  if (typeof minutes !== 'number' || isNaN(minutes) || minutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let result = "";

  if (hours > 0) {
    result += `${hours}h`;
  }

  if (remainingMinutes > 0) {
    if (result.length > 0) {
      result += " ";
    }
    result += `${remainingMinutes}mins`;
  }

  return result;
}

export default minutesToString;