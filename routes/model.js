// routes/model.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Endpoint to receive model updates from the SDK
router.post('/update-model', authMiddleware, async (req, res) => {
    try {
        const { modelData } = req.body;

        // TODO: Save the model data to the database or process as needed
        // For now, just log it
        console.log('Received model update:', modelData);

        res.status(200).json({ message: 'Model update received.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
