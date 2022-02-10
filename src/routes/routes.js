const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// Task
router
  .route('/tasks')
  .get(protect, taskController.getAllTasks)
  .post(protect, taskController.createTask);

router
  .route('/task/:id')
  .get(protect, taskController.getTaskById)
  .put(protect, taskController.editTask)
  .delete(protect, taskController.deleteTask);

// Subtask
router.route('/task/:id/subtask').post(taskController.createSubtask);
router.route('/task/:id/subtask-delete').post(taskController.deleteSubtask);

// Project
router
  .route('/projects')
  .get(protect, projectController.getAllProjects)
  .post(protect, projectController.createProject);

router.route('/projects/:id').delete(protect, projectController.deleteProject);

// User
router.route('/auth/register').post(userController.registerUser);
router.route('/auth/login').post(userController.authUser);
router.route('/user/:id').get(userController.getUserById);

module.exports = router;
