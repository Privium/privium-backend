import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/api/auth', (await import('./routes/auth.js')).default);
app.use('/api/data', (await import('./routes/data.js')).default);
app.use('/api/model', (await import('./routes/model.js')).default);
app.use('/api/compliance', (await import('./routes/compliance.js')).default);

app.get('/', (req, res) => {
  res.send('Welcome to the Privium Backend API');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
