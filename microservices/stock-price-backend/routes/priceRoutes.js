const express = require('express');
const router = express.Router();
const Price = require('../models/Price');

// Start with one stock
let stock = new Price("AAPL", 150);

// Get latest stock price
router.get('/', (req, res) => {
  res.json(stock);
});

module.exports = { router, stock };
