// authController.js
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User (for Admin registration)
export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(username);
    console.log(hashedPassword);
    const user = new User({ username, password: hashedPassword });
    console.log(user);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
export const login = async (req, res) => {
    
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true, // HTTP-only means this cookie cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure flag for production (HTTPS)
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout User (Clear JWT cookie)
export const logout = (req, res) => {
  // Clear the jwt cookie
  res.clearCookie('jwt');
  res.json({ message: 'Logged out successfully' });
};
