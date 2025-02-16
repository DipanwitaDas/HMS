const express = require('express');
const router = express.Router();
const { getAllPatients } = require('../models/adminPatientModel');

// Route to get all patient details
router.get('/patients', async (req, res) => {
    try {
        const patients = await getAllPatients();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient details', error });
    }
});

module.exports = router;
