/** @format */

const express = require('express');
const router = express.Router();
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
router.get('/:id', getTask);

//post user
router.post('/', createTask);

//update task by 'id' - using UUID as record identifier*
router.put('/:id', updateTask);

//delete task by 'id' - using UUID as record identifier*
router.delete('/:id', deleteTask);

module.exports = router;
