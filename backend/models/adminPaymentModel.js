const db = require("../db");

// Create a new payment
const createPayment = (payment, callback) => {
  const { patient_id, admin_id, amount, pay_date, pay_method, pay_status } = payment;
  const sql = `
    INSERT INTO payment (patient_id, admin_id, amount, pay_date, pay_method, pay_status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [patient_id, admin_id, amount, pay_date, pay_method, pay_status], callback);
};

// Update payment status
const updatePaymentStatus = (payment_id, pay_status, callback) => {
  const sql = `UPDATE payment SET pay_status = ? WHERE payment_id = ?`;
  db.query(sql, [pay_status, payment_id], callback);
};

// Update payment method
const updatePaymentMethod = (payment_id, pay_method, callback) => {
  const sql = `UPDATE payment SET pay_method = ? WHERE payment_id = ?`;
  db.query(sql, [pay_method, payment_id], callback);
};

// Search payment by payment_id or patient_id
const searchPayment = (id, callback) => {
  const sql = `SELECT * FROM payment WHERE payment_id = ? OR patient_id = ?`;
  db.query(sql, [id, id], callback);
};

// Fetch all payments
const getAllPayments = (callback) => {
  const sql = `SELECT * FROM payment`;
  db.query(sql, callback);
};

module.exports = {
  createPayment,
  updatePaymentStatus,
  updatePaymentMethod,
  searchPayment,
  getAllPayments,
};
