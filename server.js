const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import routes
const patientRoutes = require('./routes/patients');
const staffRoutes = require('./routes/staff');
const billRoutes = require('./routes/bills');
const reportRoutes = require('./routes/reports');
const appointmentRoutes = require('./routes/appointments');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Mount routes
app.use('/api/patients', patientRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/appointments', appointmentRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hospital Management API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});