/** @format */
const createError = require('http-errors');
const { Op } = require('sequelize');

const User = require('../models/User');

//get all users
const getUsers = async (req, res, next) => {
	try {
		await User.findAll().then((users) => {
			res.status(200);
			res.json(users);
		});
	} catch (error) {
		next();
	}
};

//get user by id
const getUser = async (req, res, next) => {
	try {
		const { id } = req.params;

		await User.findOne({
			where: {
				id,
			},
		})
			.then((user) => {
				return res.status(200).json(user);
			})
			.catch(() => {
				return next(createError(400, 'User not found'));
			});
	} catch (error) {
		next();
	}
};

//post user
const createUser = async (req, res, next) => {
	try {
		const { username, password, email } = req.body;

		await User.findOne({
			where: { [Op.or]: [{ username }, { email }] },
		})
			.then((user) => {
				if (user)
					return next(
						createError(
							409,
							'User with provided username and email already exists'
						)
					);
			})
			.finally(async (user) => {
				if (!user) {
					await User.build({ username, email, password })
						.save()
						.then((newUser) => {
							res.status(201);
							res.json(newUser);
						})
						.catch((err) => {
							return next(err);
						});
				}

				next();
			});
	} catch (error) {
		next();
	}
};

//put user by id
const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { username, email, password, deleted } = req.body;

		await User.findOne({ where: { id } })
			.then(async (user) => {
				const updatedUser = await user.update(req.body);
				const { username, email } = updatedUser.dataValues;
				return await { username, email };
			})
			.then((user) => {
				res.status(201).json({ message: 'User successfully updated', user });
			})
			.catch((err) => {
				next(createError(409, 'Error updating user'));
			});
	} catch (error) {
		next();
	}
};

//delete user
const deleteUser = async (req, res, next) => {
	try {
		next(createError(500, 'Not Implemented'));
	} catch (error) {
		next();
	}
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
