const Project = require('../models/projectModel');

module.exports = {
  async getAllProjects(req, res) {
    const { user_id } = req.headers;

    try {
      const projects = await Project.find({ user: user_id });

      if (projects) {
        return res.json(projects);
      }
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  },
  async createProject(req, res) {
    const { name, title, color } = req.body;
    const { user_id } = req.headers;
    try {
      const project = await Project.create({
        name,
        title,
        color,
        user: user_id,
      });

      return res.json(project);
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteProject(req, res) {
    const { id } = req.params;

    try {
      const project = await Project.findById(id);

      if (project) {
        await Project.findByIdAndRemove(id);
        return res.json({ message: 'Project deleted successfully' });
      }
    } catch (error) {
      return res.status(400).json({ message: "Project doesn't exist" });
    }
  },
};
