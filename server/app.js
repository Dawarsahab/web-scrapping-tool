require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const scrapeRoutes = require('./routes/scrapeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scrapeDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/scrape', scrapeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));