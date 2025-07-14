const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


// SIGNUP CONTROLLER
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

        console.log('Signup request body:', req.body); // DEBUG LOG
    console.log('Email valid?', isValidEmail(email)); // DEBUG LOG

    if (!isValidEmail(email)) {
      console.log('Invalid email format detected'); // DEBUG LOG
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
