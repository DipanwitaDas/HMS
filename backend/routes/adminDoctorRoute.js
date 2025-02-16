const express = require("express");
const AdminDoctorModel = require("../models/adminDoctorModel");

const router = express.Router();

// Route to fetch all doctors
router.get("/doctors", (req, res) => {
  AdminDoctorModel.getAllDoctors((err, doctors) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch doctors" });
    }
    res.status(200).json(doctors);
  });
});

// Route to add a new doctor
router.post("/doctors", (req, res) => {
  const doctorData = req.body;

  AdminDoctorModel.addDoctor(doctorData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add doctor" });
    }
    res.status(201).json({ message: "Doctor added successfully", doctorId: result.insertId });
  });
});

// Route to remove a doctor by doctor_id
router.delete("/doctors/:id", (req, res) => {
  const doctorId = req.params.id;

  AdminDoctorModel.removeDoctor(doctorId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to remove doctor" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor removed successfully" });
  });
});

module.exports = router;
