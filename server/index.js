// backend/server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch place suggestions using Google Places API
app.get('/api/place-autocomplete', async (req, res) => {
  const { input } = req.query;
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          input,
          key: process.env.GOOGLE_API_KEY, // Securely use environment variable
        },
      }
    );
    res.json(response.data.predictions);
  } catch (err) {
    console.error('Error fetching place suggestions:', err);
    res.status(500).json({ error: 'Error fetching place suggestions' });
  }
});

// Endpoint to fetch place details (latitude & longitude) using Google Places API
app.get('/api/place-details', async (req, res) => {
  const { placeId } = req.query;
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          key: process.env.GOOGLE_API_KEY, // Securely use environment variable
        },
      }
    );
    res.json(response.data.result.geometry.location); // Return lat/lng
  } catch (err) {
    console.error('Error fetching place details:', err);
    res.status(500).json({ error: 'Error fetching place details' });
  }
});

// Simulated water detection data
app.get('/api/water-data', (req, res) => {
  const mockData = [
    { date: '2024-01-01', coverage: 500 },
    { date: '2024-02-01', coverage: 700 },
    { date: '2024-03-01', coverage: 600 },
  ];
  res.json(mockData); // Simulate water data
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
