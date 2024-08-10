// // authRoutes.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// // User registration route
// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     // If the user exists, return an error
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     user = new User({ email, password: hashedPassword });
//     await user.save();

//     // Generate a token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token, user });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // User login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     // If the user doesn't exist, return an error
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare the passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate a token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     console.log(user);

//     res.json({ token, user });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration route with mobile number
router.post('/register', async (req, res) => {
  const { name, mobileNumber } = req.body;

  try {
    let user = await User.findOne({ mobileNumber });

    // If the user exists, return an error
    if (!user) {
      // return res.status(400).json({ message: 'User already exists' });
      // Create a new user
      user = new User({ username: name, mobileNumber });
      await user.save();
    }



    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
