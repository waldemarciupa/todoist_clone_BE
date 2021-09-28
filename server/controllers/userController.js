const bcrypt = require('bcrypt');
const User = require('../models/User');

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
};
