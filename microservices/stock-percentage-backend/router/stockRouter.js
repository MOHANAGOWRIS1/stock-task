const express = require("express");
const Fund = require("../models/stock");

const router = express.Router();

let nav = 2000; // starting NAV
let currentFund = new Fund("HDFC Flexi Cap", nav, new Date().toISOString());

// Function to simulate NAV fluctuation
function updateFund() {
  const change = (Math.random() * 4 - 2).toFixed(2); // -2 to +2
  nav = (parseFloat(nav) + parseFloat(change)).toFixed(2);
  currentFund = new Fund("HDFC Flexi Cap", parseFloat(nav), new Date().toISOString());
}

// REST API: Get current NAV
router.get("/", (req, res) => {
  updateFund();
  res.json(currentFund);
});

module.exports = { router, updateFund, getFund: () => currentFund };
