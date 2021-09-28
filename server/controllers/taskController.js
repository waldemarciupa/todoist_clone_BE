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
  async createTask(req, rs) {
    const { title, description, project, priority, completed } = req.body;
    const { user_id } = req.headers;
    try {
      const task = await Task.create({
        title,
        description,
        project,
        priority,
        completed,
        user: user_id,
      });

      return res.json(task);
    } catch (error) {
      throw new Error(error);
    }
  },
};
