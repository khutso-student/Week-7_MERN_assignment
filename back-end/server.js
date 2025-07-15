// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://week-7-mern-assignment-vius.vercel.app',
  'https://week-7-mern-assignment-ah69.vercel.app',
  'https://week-7-devops-deployment-assignment-xue3.onrender.com',
  'https://week-7-mern-assignment.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.options('*', (req, res) => {
  console.log('Preflight request for:', req.originalUrl);
  res.sendStatus(200);
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

module.exports = app;
