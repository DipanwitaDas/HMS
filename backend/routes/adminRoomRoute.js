const express = require('express');
const router = express.Router();
const Room = require('../models/adminRoomModel');

router.get('/rooms', (req, res) => {
    Room.getAllRooms((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.put('/rooms/:room_number', (req, res) => {
    const room_number = req.params.room_number;
    const { patientIds } = req.body; 

    Room.updatePatientsInRoom(room_number, patientIds, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Room updated successfully' });
    });
});

module.exports = router;
