const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = {
  async registerUser(req, res) {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.json(user);
    }

    return res
      .status(400)
      .json({ message: 'User with this email already exist' });
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
