const express = require("express");
const router = express.Router();
const AdminAppointmentModel = require("../models/adminAppointmentModel");

// GET /admin/appointments - Fetch all appointments
router.get("/appointments", (req, res) => {
  AdminAppointmentModel.getAllAppointments((err, appointments) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch appointments" });
    }
    res.status(200).json({ appointments });
  });
});

// PUT /admin/appointments/:id - Update appointment status
router.put("/appointments/:id", (req, res) => {
  const appointment_id = req.params.id;
  const { newStatus } = req.body;

  if (!newStatus) {
    return res.status(400).json({ error: "Status is required" });
  }

  if (!["processing", "approved", "completed"].includes(newStatus)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  AdminAppointmentModel.updateAppointmentStatus(appointment_id, newStatus, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update status" });
    }
    res.status(200).json({ message: "Appointment status updated successfully" });
  });
});

module.exports = router;
