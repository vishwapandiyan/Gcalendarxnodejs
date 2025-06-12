const { google } = require('googleapis');
const { exchangeCodeForToken, createCalendarEvent } = require('../services/calendarService');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

exports.auth = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
  res.redirect(authUrl);
};

exports.oauth2callback = async (req, res) => {
  const code = req.query.code;
  try {
    const accessToken = await exchangeCodeForToken(code);
    const eventLink = await createCalendarEvent(accessToken);
    res.send(` Event created <a href="${eventLink}" target="_blank">${eventLink}</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send(' Error creating calendar event');
  }
};