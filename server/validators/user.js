/** @format */

const { check, validationResult } = require('express-validator');

const errorFormatter = ({ msg, param }) => {
	return {
		error: `${msg}`,
		message: `${param}`,
	};
};

/*Field validators*/

const validateUsername = (req) => {
	return check('username')
		.exists()
		.isLength({ min: 3 })
		.withMessage('Username must be at-least 3 characters')
		.run(req);
};

const validateEmail = (req) => {
	return check('email').isEmail().normalizeEmail().run(req);
};

const validatePassword = (req) => {
	return check('password', 'Password must be alpha-numeric')
		.exists()
		.isLength({ min: 8 })
		.withMessage('Password must contain at-least 8 characters')
		.matches('(?=.*?[0-9])')
		.withMessage('Password must contain at-least 1 number')
		.matches('(?=.*?[A-Z])')
		.withMessage('Password must contain at-least one upper case character')
		.matches('(?=.*?[a-z])')
		.withMessage('Password must contain at-least one lower case character')
		.matches('(?=.*?[#?!@$%^&*-])')
		.withMessage('Password must contain at-least one special character')
		.run(req);
};

const validateUserId = (req) => {
	return check('id').exists().isUUID().withMessage('Invalid user Id').run(req);
};

/*Aggregate validators*/

/*User GET*/
const validateGetUser = async (req, res, next) => {
	await validateUserId(req);
	await validate(req, res, next);

	next();
};

/*User POST*/
const validateCreateUser = async (req, res, next) => {
	await validateUsername(req);
	await validateEmail(req);
	await validatePassword(req);
	await validate(req, res, next);

	next();
};

/*User PUT*/
const validateUpdateUser = async (req, res, next) => {
	const { username, email, password, deleted } = req.body;

	await validateUserId(req);

	username ? await validateUsername(req) : undefined;
	email ? await validateEmail(req) : undefined;
	password ? await validatePassword(req) : undefined;
	deleted ? await validateDeleted(req) : undefined;

	await validate(req, res, next);

	next();
};

const validate = (req, res) => {
	const result = validationResult(req).formatWith(errorFormatter);
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() });
	}
	return true;
};

module.exports = {
	validateCreateUser,
	validateGetUser,
	validateUpdateUser,
};
