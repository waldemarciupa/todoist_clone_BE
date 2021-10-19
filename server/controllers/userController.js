const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = {
  async registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(200)
        .json({ message: 'Enter your name, email and password ' });
    }

    if (
      name.includes(' ') > 0 ||
      email.includes(' ') > 0 ||
      password.includes(' ') > 0
    ) {
      return res
        .status(200)
        .json({ message: "You can't use any whitespace characters" });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
        return res.json({
          user: token,
          user_id: user._id,
        });
      });
    }

    return res
      .status(400)
      .json({ message: 'User with this email already exist' });
  },
  async authUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(200)
          .json({ message: 'Enter your email and password ' });
      }

      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const userResponse = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        return jwt.sign(
          { userResponse },
          process.env.JWT_SECRET,
          (err, token) => {
            return res.json({
              user: token,
              user_id: user._id,
            });
          }
        );
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (user) {
        return res.send({
          id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        return res.status(400).json({ message: "User doesn't exist" });
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};
