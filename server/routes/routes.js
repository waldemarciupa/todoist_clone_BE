const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

// Task
router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

// User
router.route('/user/register').post(userController.registerUser);
router.route('/user/:id').get(userController.getUserById);

module.exports = router;
