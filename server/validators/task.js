/** @format */

const { check, validationResult } = require('express-validator');

const validateTitle = (req) => {
	return check('title')
		.exists()
		.withMessage('Title must not be empty')
		.run(req);
};

const validateDetails = (req) => {
	return check('details')
		.exists()
		.withMessage('Details must not be empty')
		.run(req);
};

const errorFormatter = ({ msg, param }) => {
	return {
		error: `${param}`,
		message: `${msg}`,
	};
};

const validateCreateTask = async (req) => {
	await validateTitle(req);
	await validateDetails(req);

	return validationResult(req).formatWith(errorFormatter);
};

module.exports = {
	validateCreateTask,
};
