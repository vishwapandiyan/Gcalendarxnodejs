const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const open = (...args) => import('open').then(m => m.default(...args));

s
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
t
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// calendar access
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

router.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(url);
});


router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

   
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

 
    const event = {
      summary: 'Sample Event from Node.js',
      location: 'Online',
      description: 'An event added via the Google Calendar API',
      start: {
        dateTime: '2025-06-13T10:00:00+05:30',
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: '2025-06-13T11:00:00+05:30',
        timeZone: 'Asia/Kolkata',
      },
    };

  
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    const eventLink = response.data.htmlLink;
    res.send(` Google Calendar authorization successful!<br> Event created: <a href="${eventLink}" target="_blank">${eventLink}</a>`);
  } catch (err) {
    console.error('Error callback:', err);
    res.status(500).send('Failed to add event');
  }
});

module.exports = router;