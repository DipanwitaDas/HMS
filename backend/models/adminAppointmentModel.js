const db = require("../db"); // Import your database connection

const AdminAppointmentModel = {
  getAllAppointments: (callback) => {
    const query = "SELECT appointment_id, patient_id, disease_type, state AS status, appointment_date, appointment_time FROM appointments";
    
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching appointments:", err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  updateAppointmentStatus: (appointment_id, newStatus, callback) => {
    const query = "UPDATE appointments SET state = ? WHERE appointment_id = ?";
    
    db.query(query, [newStatus, appointment_id], (err, result) => {
      if (err) {
        console.error("Error updating appointment status:", err);
        return callback(err, null);
      }

      if (result.affectedRows === 0) {
        console.error("No appointment found with the given ID.");
        return callback(new Error("Appointment not found"), null);
      }

      console.log("Appointment status updated successfully:", result);
      return callback(null, result);
    });
  },
};

module.exports = AdminAppointmentModel;
