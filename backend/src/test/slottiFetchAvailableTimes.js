const axios = require('axios');

const apiUrl = 'https://slotti.fi/booking/upwashoy/api/v4/bookings/bookabletimes/';

// general-service (b2b)
const serviceGuid = '964b7b84-2312-4253-80ec-ae57277a6c04';

const startDateTime = '2023-07-18T21:00:32.334Z';
const endDateTime = '2023-07-30T21:00:32.334Z';

const payload = {
  start: startDateTime,
  end: endDateTime,
  serviceLinks: [
    {
      type: 'primary',
      serviceGuid,
      durationMinutes: 60
    }
  ]
};

const makeRequest = async () => {
  try {
    const response = await axios.post(apiUrl, payload);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

makeRequest();
