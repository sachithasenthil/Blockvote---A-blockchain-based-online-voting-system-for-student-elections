const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { voterId, email, password, fullName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ voterId }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Voter ID or Email already registered' });
    }

    // Create new user
    const user = new User({ voterId, email, password, fullName });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        voterId: user.voterId,
        email: user.email,
        fullName: user.fullName,
        hasVoted: user.hasVoted
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { voterId, password } = req.body;

    // Find user
    const user = await User.findOne({ voterId });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        voterId: user.voterId,
        email: user.email,
        fullName: user.fullName,
        hasVoted: user.hasVoted
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    res.json({
      user: {
        voterId: req.user.voterId,
        email: req.user.email,
        fullName: req.user.fullName,
        hasVoted: req.user.hasVoted,
        votedAt: req.user.votedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};