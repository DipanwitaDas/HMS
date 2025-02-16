const express = require("express");
const router = express.Router();
const adminPaymentModel = require("../models/adminPaymentModel");

// Create a new payment
router.post("/create", (req, res) => {
  const payment = req.body;

  adminPaymentModel.createPayment(payment, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(201).json({ message: "Payment created successfully", paymentId: result.insertId });
  });
});

// Update payment status
router.put("/update-status/:payment_id", (req, res) => {
  const { payment_id } = req.params;
  const { pay_status } = req.body;

  adminPaymentModel.updatePaymentStatus(payment_id, pay_status, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment status updated successfully" });
  });
});

// Update payment method
router.put("/update-method/:payment_id", (req, res) => {
  const { payment_id } = req.params;
  const { pay_method } = req.body;

  adminPaymentModel.updatePaymentMethod(payment_id, pay_method, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment method updated successfully" });
  });
});

// Search payment by payment_id or patient_id
router.get("/search/:id", (req, res) => {
  const { id } = req.params;

  adminPaymentModel.searchPayment(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No payments found" });
    }
    res.json(results);
  });
});

// Fetch all payment details
router.get("/all", (req, res) => {
  adminPaymentModel.getAllPayments((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json(results);
  });
});

module.exports = router;
