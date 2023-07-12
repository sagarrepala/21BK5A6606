const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || urls.length === 0) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  const fetchPromises = urls.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.numbers || [])
      .catch((error) => {
        console.error(`Error fetching numbers from ${url}:`, error);
        return [];
      })
  );

  try {
    const results = await Promise.all(fetchPromises);
    const mergedNumbers = Array.from(new Set([].concat(...results))).sort((a, b) => a - b);

    return res.json({ numbers: mergedNumbers });
  } catch (error) {
    console.error('Error merging numbers:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});