const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = "your_secret_key";
const patientModel = require('../models/patientModel');

// Route for patient registration
router.post('/register', (req, res) => {
  const newPatient = req.body;
  patientModel.addPatient(newPatient, (err, result) => {
    if (err) {
      console.error('Error registering patient:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Registration successful', patientId: result.insertId });
  });
});

// Route for patient login
// Route for patient login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Ensure both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if patient exists with the given email and password
  const query = 'SELECT * FROM patient WHERE email = ? AND password = ?';
  patientModel.db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const patient = results[0];

    // Create a JWT token
    const token = jwt.sign(
      { patientId: patient.patient_id, email: patient.email },
      secretKey,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Set the token in a cookie (httpOnly for security)
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure it's secure on production
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.json({
      message: 'Login successful',
      patient: { patient_id: patient.patient_id, email: patient.email },
    });
  });
});
  

// Route for patient logout
router.post('/logout', (req, res) => {
  // Handle session/token cleanup logic if implemented
  res.json({ message: 'Logout successful' });
});

module.exports = router;
