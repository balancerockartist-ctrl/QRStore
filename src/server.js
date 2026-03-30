'use strict';

const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', apiRouter);

// Serve the SPA for any unmatched route
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`QRStore server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
