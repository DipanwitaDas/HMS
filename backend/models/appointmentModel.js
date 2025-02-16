const db = require("../db");

const createAppointment = (appointmentData, callback) => {
    const { patient_id, disease_type, state, appointment_date, appointment_time, doctor_id, doctor_name } = appointmentData;

    const checkPatientQuery = `SELECT * FROM patient WHERE patient_id = ?`;
    db.execute(checkPatientQuery, [patient_id], (err, results) => {
        if (err) {
            console.error("Error checking patient: ", err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(new Error("Patient not found"), null);
        }

        const query = `INSERT INTO appointments (patient_id, disease_type, state, appointment_date, appointment_time, doctor_id, doctor_name)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.execute(query, [patient_id, disease_type, state, appointment_date, appointment_time, doctor_id, doctor_name], (err, result) => {
            if (err) {
                console.error("Error creating appointment: ", err);
                return callback(err, null);
            }
            return callback(null, result);
        });
    });
};

module.exports = { createAppointment };
