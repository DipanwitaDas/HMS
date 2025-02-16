const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; // Replace with a secure environment variable

// Admin Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find admin by email
        const admin = await Admin.findByEmail(email);

        if (!admin) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        console.log("email found")
        // Direct password comparison
        if (admin.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        console.log("password matched")
        // Generate JWT token
        // const token = jwt.sign(
        //     { id: admin.id, email: admin.email, role: admin.role },
        //     SECRET_KEY,
        //     { expiresIn: '1h' }
        // );

        res.json({ message: 'Login successful'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

module.exports = router;
