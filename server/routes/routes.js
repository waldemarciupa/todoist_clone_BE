const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

// Task
router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router.route('/tasks/:project').get(taskController.getAllTasks);

router.route('/task/:id').get(taskController.getTaskById);
router.route('/task/:id').delete(taskController.deleteTask);

// User
router.route('/user/register').post(userController.registerUser);
router.route('/user/login').get(userController.authUser);
router.route('/user/:id').get(userController.getUserById);

module.exports = router;
