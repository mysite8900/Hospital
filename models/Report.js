const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  prescription: [{
    medicine: String,
    dosage: String,
    duration: String
  }],
  testResults: [{
    testName: String,
    result: String,
    date: Date
  }],
  nextVisit: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);