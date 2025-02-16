const db = require('../db');

const Room = {
    getAllRooms: (callback) => {
        db.query(
            `SELECT r.room_number, r.room_type, r.bed_capacity, 
                    GROUP_CONCAT(rp.patient_id) AS patient_ids 
             FROM room r 
             LEFT JOIN room_patients rp ON r.room_number = rp.room_number 
             GROUP BY r.room_number`,
            callback
        );
    },

    updatePatientsInRoom: (room_number, patientIds, callback) => {
        db.query(`DELETE FROM room_patients WHERE room_number = ?`, [room_number], (err) => {
            if (err) return callback(err);
            
            if (patientIds.length === 0) return callback(null);  // If no patients, return.

            const values = patientIds.map((id) => [room_number, id]);
            db.query(
                `INSERT INTO room_patients (room_number, patient_id) VALUES ?`,
                [values],
                callback
            );
        });
    }
};

module.exports = Room;
