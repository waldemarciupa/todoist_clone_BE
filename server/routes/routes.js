const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router.route('/register').post(userController.registerUser);

module.exports = router;
