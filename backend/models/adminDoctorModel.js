const db = require("../db"); // Import database connection

const AdminDoctorModel = {
  // Fetch all doctors
  getAllDoctors: (callback) => {
    const query = "SELECT doctor_id, name, email, phone_number, availability_time, speciality FROM doctors";
    
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching doctors:", err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  // Add a new doctor
  addDoctor: (doctorData, callback) => {
    const { name, email, phone_number, availability_time, speciality } = doctorData;
    const query = "INSERT INTO doctors (name, email, phone_number, availability_time, speciality) VALUES (?, ?, ?, ?, ?)";

    
    db.query(query, [name, email, phone_number, availability_time, speciality], (err, result) => {
      if (err) {
        console.error("Error adding doctor:", err);
        return callback(err, null);
      }
      return callback(null, result);
    });
  },

  // Remove a doctor by doctor_id
  removeDoctor: (doctorId, callback) => {
    const query = "DELETE FROM doctors WHERE doctor_id = ?";
    
    db.query(query, [doctorId], (err, result) => {
      if (err) {
        console.error("Error removing doctor:", err);
        return callback(err, null);
      }
      return callback(null, result);
    });
  }
};

module.exports = AdminDoctorModel;
