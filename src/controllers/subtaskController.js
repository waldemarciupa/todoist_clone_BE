const Subtask = require('../models/subtaskModel');

module.exports = {
  async getAllSubtasks(req, res) {
    const { task_id } = req.headers;
    const { user_id } = req.headers;

    console.log('task_id ' + task_id);
    console.log('user_id ' + user_id);

    const query = { user: user_id, task: task_id };
    console.log(query);
    try {
      console.log('try to find');
      const subtasks = await Subtask.find(query);

      console.log('what is subtask ');
      console.log(subtasks);

      if (subtasks) {
        return res.json(subtasks);
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Enjoy your day. You don't have any task to do" });
    }
  },
  async createSubtask(req, res) {
    const { title, description, project, priority } = req.body;
    const { task_id } = req.headers;
    const { user_id } = req.headers;

    try {
      const subtask = await Subtask.create({
        title,
        description,
        project,
        priority,
        task: task_id,
        user: user_id,
      });

      return res.json({
        subtask,
        message: 'Subtask successfully created',
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
