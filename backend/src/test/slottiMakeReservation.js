const axios = require('axios');

const apiUrl = 'https://slotti.fi/booking/upwashoy/api/v4/bookings/';

// general-service (b2b)
const serviceGuid = '964b7b84-2312-4253-80ec-ae57277a6c04';

const resourceGuid = '61f10b83-720c-46b3-9d37-77bbd2811649';

const startDateTime = '2023-07-21T08:00:00+03:00';
const endDateTime = '2023-07-21T09:00:00+03:00';

const payload = {
  resourceGuid,
  start: startDateTime,
  end: endDateTime,
  customerLink: {
    personCount: 1,
    customer: {
      firstName: 'B2B',
      lastName: 'Asiakas',
      email: 'b2b-asiakas@example.com',
      phone: '040-12345678',
      language: 'fi',
    },
  },
  info: '[B2B information]',
  serviceLinks: [
    {
      type: 'primary',
      serviceGuid,
      durationMinutes: 60,
    },
  ],
  anyProvider: false,
  attributes: [
    {
      stringValue: 'google mainoksen perusteella',
      typeGuid: 'a60bdf00-aa56-4574-a409-f7c13e39dade',
      dataType: 'string',
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
