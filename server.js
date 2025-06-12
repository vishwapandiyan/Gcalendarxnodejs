// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();

// Import route handlers
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json());

// Mount routes
app.use('/', authRoutes); 

// Health check route
app.get('/', (req, res) => {
  res.send('Google Calendar API is running ✅');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
