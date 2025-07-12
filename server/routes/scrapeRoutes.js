const express = require('express');
const router = express.Router();
const { scrapeWebsite } = require('../controllers/scrapeController');

router.post('/', async (req, res) => {
  try {
    const result = await scrapeWebsite(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;