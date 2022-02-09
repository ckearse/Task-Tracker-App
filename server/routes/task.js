/** @format */

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const {
	getTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
} = require('../controllers/task');

//get all tasks
router.get('/', getTasks);

//get task by 'id' - using UUID as record identifier*
router.get('/', getTask);

//post user
router.post('/', createTask);

//update task by 'id' - using UUID as record identifier*
router.put('/', updateTask);

//delete task by 'id' - using UUID as record identifier*
router.delete('/', deleteTask);

module.exports = router;
