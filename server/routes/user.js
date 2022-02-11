/** @format */

const express = require('express');
const router = express.Router();
const {
	validateCreateUser,
	validateGetUser,
	validateUpdateUser,
} = require('../validators/user');

const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/user');

//get all users
//TODO: restrict access to admin user
router.get('/', getUsers);

//get user by 'id' - using UUID as record identifier*
//TODO: restrict access to admin user
router.get('/:id', validateGetUser, getUser);

//post user
router.post('/', validateCreateUser, createUser);

//update user by 'id' - using UUID as record identifier*

router.put('/:id', validateUpdateUser, updateUser);

//delete user by 'id' - not used, will update delete column for user record
router.delete('/:id', deleteUser);

module.exports = router;
