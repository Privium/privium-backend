// routes/compliance.js
import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Endpoint to handle GDPR data retrieval requests
router.get('/gdpr-data', authMiddleware, async (req, res) => {
    try {
        const userData = await User.findById(req.user.id).select('-password');
        res.status(200).json({ userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Endpoint to handle GDPR data deletion requests
router.delete('/gdpr-delete', authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'User data deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Endpoint to handle CCPA opt-out requests
router.post('/ccpa-opt-out', authMiddleware, async (req, res) => {
    try {
        // TODO: Implement CCPA opt-out logic
        res.status(200).json({ message: 'CCPA opt-out processed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
