import { Router } from 'express';
import pkg from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const { compare } = pkg;
const { sign } = jwt;

const router = Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const apiKey = crypto.randomBytes(20).toString('hex');
    user = new User({ name, email, password, apiKey });

    await user.save();

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600
    });

    res.json({ token, apiKey });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600
    });

    res.json({ token, apiKey: user.apiKey });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
