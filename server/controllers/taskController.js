const Task = require('../models/taskModel');

module.exports = {
  async getAllTasks(req, res) {
    const { project } = req.params;
    const { user_id } = req.headers;

    const query = project
      ? {
          user: user_id,
          project: project,
        }
      : {
          user: user_id,
        };

    try {
      const tasks = await Task.find(query);

      if (tasks) {
        return res.json(tasks);
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Enjoy your day. You don't have any task to do" });
    }
  },
  async createTask(req, res) {
    const { title, description, project, priority, completed } = req.body;
    const { user_id } = req.headers;
    try {
      const task = await Task.create({
        title,
        description,
        project,
        priority,
        user: user_id,
      });

      return res.json(task);
    } catch (error) {
      throw new Error(error);
    }
  },
  async getTaskById(req, res) {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);

      if (task) {
        return res.json(task);
      }
    } catch (error) {
      return res.status(400).json({ message: "Task doesn't exist" });
    }
  },
  async deleteTask(req, res) {
    const { id } = req.params;

    try {
      const task = await Task.findById(id);

      if (task) {
        await Task.findByIdAndRemove(id);
        return res.json({ message: 'Task deleted successfully' });
      }
    } catch (error) {
      return res.status(400).json({ message: "Task doesn't exist" });
    }
  },
};
