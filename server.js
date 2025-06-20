const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const pageToken = req.query.pageToken || "";
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}&maxResults=6&pageToken=${pageToken}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));