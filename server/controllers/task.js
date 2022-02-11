/** @format */

const createError = require('http-errors');

//get all Tasks
const getTasks = async (req, res, next) => {
	try {
		//TODO
		next(createError(500, 'Not Implemented'));
	} catch (error) {
		next();
	}
};

//get Task by id
const getTask = async (req, res, next) => {
	try {
		//TODO
		next(createError(500, 'Not Implemented'));
	} catch (error) {
		next();
	}
};

//post Task
const createTask = async (req, res, next) => {
	try {
		//TODO
		next(createError(500, 'Not Implemented'));
	} catch (error) {
		next();
	}
};

//put Task by id
const updateTask = async (req, res, next) => {
	try {
		//TODO
		next(createError(500, 'Not Implemented'));
	} catch (error) {
		next();
	}
};

//delete Task
const deleteTask = async (req, res, next) => {
	try {
		//TODO
		next(createError(500, 'Not Implemented'));
	} catch (error) {
		next();
	}
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
