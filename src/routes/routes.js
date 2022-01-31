const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// Task
router
  .route('/')
  .get(protect, taskController.getAllTasks)
  .post(protect, taskController.createTask);

router.route('/tasks/:project').get(protect, taskController.getAllTasks);

router
  .route('/task/:id')
  .get(taskController.getTaskById)
  .put(protect, taskController.editTask)
  .delete(protect, taskController.deleteTask);

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
