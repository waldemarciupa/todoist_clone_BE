const Task = require('../models/Task');

module.exports = {
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find({});

      if (tasks) {
        return res.json(tasks);
      }
    } catch (error) {
      return res
        .satus(400)
        .json({ message: "Enjoy your day. You don't have any task to do" });
    }
  },
};
