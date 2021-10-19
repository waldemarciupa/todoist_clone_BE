const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// Task
router
  .route('/')
  .get(protect, taskController.getAllTasks)
  .post(protect, taskController.createTask);

router.route('/tasks/:project').get(protect, taskController.getAllTasks);

router.route('/task/:id').get(taskController.getTaskById);
router.route('/task/:id').delete(taskController.deleteTask);

// User
router.route('/user/register').post(userController.registerUser);
router.route('/user/login').post(userController.authUser);
router.route('/user/:id').get(userController.getUserById);

module.exports = router;
