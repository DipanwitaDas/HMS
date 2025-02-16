const db = require('../db'); // Import database connection

// Function to get all patients (only necessary details)
const getAllPatients = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT patient_id, first_name, last_name, gender, date_of_birth, 
            contact_number, email, blood_group, medical_history, registration_date 
            FROM patient`,
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
};

module.exports = { getAllPatients };
