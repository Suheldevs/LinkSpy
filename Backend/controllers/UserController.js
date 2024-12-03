const User = require('../models/UserModel');


const userSignin = async (req, res) => {
    const { email, password, name } = req.body;
  
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const newUser = new User({ email, password, name });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

const userLogin = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email not Register yet!' });
      }
  
      const isMatch = user.password == password;
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
  
      res.status(200).json({ message: 'Login successful' ,userData:user});
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

  module.exports = {userSignin,userLogin}
  