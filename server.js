
require('dotenv').config();

const express = require('express');
const app = express();


const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json());

// routes
app.use('/', authRoutes); 


app.get('/', (req, res) => {
  res.send('Google Calendar API is running ');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
