const axios = require('axios');
const { clientId, clientSecret, redirectUri, tokenUrl } = require('../config/googleOAuth');

exports.exchangeCodeForToken = async (code) => {
  const response = await axios.post(tokenUrl, null, {
    params: {
      code,
      client_id: clientId,client_secret: clientSecret,redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return response.data.access_token;
};

exports.createCalendarEvent = async (accessToken) => {
  const event = {
    summary: 'Professional Meeting',
    description: 'Created with clean architecture',
    start: { dateTime: '2025-06-15T10:00:00+05:30' },
    end: { dateTime: '2025-06-15T11:00:00+05:30' }
  };

  const response = await axios.post(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    event,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.htmlLink;
};