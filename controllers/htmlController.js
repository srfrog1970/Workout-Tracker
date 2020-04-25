// Template information to node/express

// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const express = require("express");
const router = express.Router();

// Get home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Get home page
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});
//
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});
// Use 'get' html controllers

module.exports = router;
