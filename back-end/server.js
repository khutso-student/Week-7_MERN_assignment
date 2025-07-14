const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // <-- import cors
const authRoutes = require('./routes/AuthRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // <-- allow your frontend origin
  credentials: true,               // if you use cookies/auth headers
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB connected');
      app.listen(5000, () => {
        console.log('Server running on http://localhost:5000');
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

module.exports = app;
