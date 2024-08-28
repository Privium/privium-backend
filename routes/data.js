// routes/data.js
import express from 'express';
import Data from '../models/Data.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Endpoint to collect data from the SDK
router.post('/collect', authMiddleware, async (req, res) => {
    try {
        const { data } = req.body;

        // Save the received data to the database
        const newData = new Data({ user: req.user.id, data });
        await newData.save();

        res.status(201).json({ message: 'Data collected successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
