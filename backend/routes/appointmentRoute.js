const express = require("express");
const router = express.Router();
const appointmentModel = require("../models/appointmentModel");
const db = require("../db");

// Create an appointment
router.post('/appointments', (req, res) => {
    const appointmentData = req.body;

    if (!appointmentData.patient_id || !appointmentData.disease_type || !appointmentData.appointment_date || 
        !appointmentData.appointment_time || !appointmentData.doctor_id || !appointmentData.doctor_name) {
        console.log("missing required fields");
        return res.status(400).json({ message: "Missing required fields" });
    }

    appointmentModel.createAppointment(appointmentData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error creating appointment", error: err.message });
        }
        return res.status(201).json({ message: "Appointment created successfully", appointment: result });
    });
});

router.get("/appointments", (req, res) => {
    const { patient_id } = req.query;
    // const patient_id = 7;

    if (!patient_id || isNaN(patient_id)) {
        return res.status(400).json({ message: "Invalid or missing patient_id" });
    }

    const sql = "SELECT * FROM appointments WHERE patient_id = ?";
    db.query(sql, [patient_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json(results);
        console.log(results);
    });
});


// Fetch doctors based on disease type
router.get('/doctors', (req, res) => {
    const diseaseType = req.query.diseaseType;

    if (!diseaseType) {
        return res.status(400).json({ message: "Disease type is required" });
    }

    const query = `SELECT id, name, speciality FROM doctors WHERE speciality = ?`;
    
    db.execute(query, [diseaseType], (err, results) => {
        if (err) {
            console.error("Error fetching doctors:", err);
            return res.status(500).json({ message: "Error fetching doctors", error: err.message });
        }
        return res.status(200).json({ doctors: results });
    });
});

module.exports = router;
