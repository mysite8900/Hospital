const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('patient')
      .populate('doctor');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new report
router.post('/', async (req, res) => {
  const report = new Report(req.body);
  try {
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;