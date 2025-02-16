const db = require('../db');

const getAllPatients = (callback) => {
  const query = 'SELECT * FROM patient';
  db.query(query, callback);
};

const addPatient = (patientData, callback) => {
  const query = `
    INSERT INTO patient (first_name, last_name, gender, date_of_birth, contact_number, email, address, blood_group, medical_history, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    patientData.first_name,
    patientData.last_name,
    patientData.gender,
    patientData.date_of_birth,
    patientData.contact_number,
    patientData.email,
    patientData.address,
    patientData.blood_group,
    patientData.medical_history,
    patientData.password, // Adding the password field
  ];
  db.query(query, values, callback);
};

module.exports = {
  db, // Export db object
  addPatient,
};
