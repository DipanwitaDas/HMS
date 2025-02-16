const express = require("express");
const router = express.Router();
const Nurse = require("../models/adminNurseModel");

router.get("/nurses", (req, res) => {
    Nurse.getAllNurses((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

router.post("/nurses", (req, res) => {
    const { name, email, availability, doctor_id } = req.body;
    Nurse.addNurse(name, email, availability, doctor_id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Nurse added successfully" });
    });
});

router.delete("/nurses/:id", (req, res) => {
    const { id } = req.params;
    Nurse.deleteNurse(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Nurse deleted successfully" });
    });
});

router.put("/nurses/:id", (req, res) => {
    const { id } = req.params;
    const { doctor_id } = req.body;
    Nurse.updateNurseDoctor(id, doctor_id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Doctor ID updated successfully" });
    });
});

module.exports = router;