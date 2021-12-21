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

router
  .route('/projects')
  .get(protect, projectController.getAllProjects)
  .post(protect, projectController.createProject);

router.route('/tasks/:project').get(protect, taskController.getAllTasks);

router.route('/task/:id').get(taskController.getTaskById);
router.route('/task/:id').put(protect, taskController.editTask);
router.route('/task/:id').delete(protect, taskController.deleteTask);

// User
router.route('/users/register').post(userController.registerUser);
router.route('/users/login').post(userController.authUser);
router.route('/user/:id').get(userController.getUserById);

module.exports = router;
