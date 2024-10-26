// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists by email
    const user = await User.getUserByEmail(email);
    if (!user || !(await User.verifyPassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = await User.createUser({ username, email, password });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error });
  }
};

module.exports = { loginUser, signupUser };
