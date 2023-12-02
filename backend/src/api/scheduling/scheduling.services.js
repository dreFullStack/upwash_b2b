const axios = require('axios');

const getISOTime = require('../../utils/getISOTime');

async function fetchAvailableTimes(
  duration = 60,
  startDateTime = getISOTime(),
  endDateTime = getISOTime(1000 * 60 * 60 * 24 * 21) // 21 days from now,
) {
  const apiUrl = 'https://slotti.fi/booking/upwashoy/api/v4/bookings/bookabletimes/';

  // general-service (b2b)
  const serviceGuid = '964b7b84-2312-4253-80ec-ae57277a6c04';

  const payload = {
    start: startDateTime,
    end: endDateTime,
    serviceLinks: [
      {
        type: 'primary',
        serviceGuid,
        durationMinutes: duration
      }
    ]
  };

  const response = await axios.post(apiUrl, payload);
  console.log('Response:', response.data);

  return response.data;
}

module.exports = { fetchAvailableTimes };
