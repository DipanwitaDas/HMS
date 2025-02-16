const db = require('../db');
const bcrypt = require('bcrypt');

class Admin {
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM admin WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]); // Assuming email is unique
            });
        });
    }
}

module.exports = Admin;
