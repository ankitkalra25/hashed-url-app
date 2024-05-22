const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const crypto = require('crypto');
const cors = require('cors');
const Url = require('./models/urls');

const app = express();
app.use(bodyParser.json());


// Allow all origins
app.use(cors());
// Allow specific origin(s)
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Generate a hash for a URL
const generateHash = (url) => {
  return crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
};

// API to shorten URL
app.post('/shorten', async (req, res) => {
  const { url, expiration_days, single_use } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const urlHash = generateHash(url);
  let expiresAt = null;

  if (expiration_days) {
    expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiration_days);
  }

  try {
    const newUrl = new Url({
      originalUrl: url,
      hash: urlHash,
      expiresAt,
      singleUse: single_use || false,
    });

    await newUrl.save();
    res.json({ shortened_url: `${req.protocol}://${req.get('host')}/r/${urlHash}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

// Redirect service
app.get('/r/:hash', async (req, res) => {
  const { hash } = req.params;

  try {
    const urlData = await Url.findOne({ hash });

    if (!urlData) {
      return res.status(404).json({ error: 'URL not found' });
    }

    if (urlData.expiresAt && new Date(urlData.expiresAt) < new Date()) {
      return res.status(410).json({ error: 'URL has expired' });
    }

    if (urlData.singleUse && urlData.useCount > 0) {
      return res.status(410).json({ error: 'URL is for single use only and has already been used' });
    }

    urlData.useCount += 1;
    await urlData.save();

    res.redirect(urlData.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Failed to redirect' });
  }
});

// Optional: Analytics endpoint
app.get('/analytics/:hash', async (req, res) => {
  const { hash } = req.params;

  try {
    const urlData = await Url.findOne({ hash });

    if (!urlData) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({ click_count: urlData.useCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get analytics' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});