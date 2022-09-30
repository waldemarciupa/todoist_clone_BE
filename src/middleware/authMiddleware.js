const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.user) {
    try {
      token = req.headers.user;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userResponse._id).select(
        '-password'
      );

      next();
    } catch (error) {
      res.sendStatus(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.redirect('/users/login');
  }
};

module.exports = protect;
