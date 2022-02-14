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
  async getTaskById(req, res) {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);

      if (task) {
        return res.json(task);
      } else {
        return res.status(404).json({ message: "Task doesn't exist" });
      }
    } catch (error) {
      return res.status(404).json({ message: "Task doesn't exist" });
    }
  },
  async createTask(req, res) {
    const { title, description, project, priority } = req.body;
    const { user_id } = req.headers;
    try {
      const task = await Task.create({
        title,
        description,
        project,
        priority,
        user: user_id,
      });

      return res.json({
        task,
        message: 'Task successfully created',
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  async editTask(req, res) {
    const { title, description, id, completed } = req.body;
    try {
      const task = await Task.findOneAndUpdate(
        { _id: id },
        { title, description, completed },
        { new: true }
      );
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
  async createSubtask(req, res) {
    const { title, description, project, priority } = req.body;

    const task = await Task.findById(req.params.id);

    if (task) {
      const subtask = {
        title,
        description,
        project,
        priority,
      };

      task.subtasks.push(subtask);

      await task.save();

      res.status(201).json(task);
    } else {
      res.status(404).json({ message: "Task doesn't exist" });
    }
  },
  async completeSubtask(req, res) {
    const { subtask_id } = req.body;
    const { subtask_completed } = req.body;

    const task = await Task.findById(req.params.id);

    if (task) {
      const subtask = task.subtasks.find((subtask) => {
        return subtask._id.valueOf() === subtask_id;
      });

      if (subtask) {
        subtask.completed = subtask_completed;

        await task.save();

        res.status(201).json(task);
      } else {
        res.status(404).json({ message: "Subtask doesn't exist" });
      }
    } else {
      res.status(404).json({ message: "Task doesn't exist" });
    }
  },
  async deleteSubtask(req, res) {
    const { subtask_id } = req.body;
    const task = await Task.findById(req.params.id);

    if (task) {
      const subtask = task.subtasks.find((subtask) => {
        return subtask._id.valueOf() === subtask_id;
      });

      if (subtask) {
        const subtasks = task.subtasks.filter((subtask) => {
          return subtask._id.valueOf() !== subtask_id;
        });

        task.subtasks = subtasks;

        await task.save();

        res.status(201).json(task);
      } else {
        res.status(404).json({ message: "Subtask doesn't exist" });
      }
    } else {
      res.status(404).json({ message: "Task doesn't exist" });
    }
  },
  async createComment(req, res) {
    const { content } = req.body;

    const task = await Task.findById(req.params.id);

    if (task) {
      const comment = {
        content,
      };

      task.comments.push(comment);

      await task.save();

      res.status(201).json(task);
    } else {
      res.status(404).json({ message: "Task doesn't exist" });
    }
  },
};
