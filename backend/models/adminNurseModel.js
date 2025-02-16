const db = require("../db");

const Nurse = {
    getAllNurses: (callback) => {
        db.query("SELECT * FROM nurse", callback);
    },
    addNurse: (name, email, availability, doctor_id, callback) => {
        db.query("INSERT INTO nurse (name, email, availability, doctor_id) VALUES (?, ?, ?, ?)", 
        [name, email, availability, doctor_id], callback);
    },
    deleteNurse: (nurse_id, callback) => {
        db.query("DELETE FROM nurse WHERE nurse_id = ?", [nurse_id], callback);
    },
    updateNurseDoctor: (nurse_id, doctor_id, callback) => {
        db.query("UPDATE nurse SET doctor_id = ? WHERE nurse_id = ?", [doctor_id, nurse_id], callback);
    }
};

module.exports = Nurse;