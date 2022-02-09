/** @format */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/user');

//get all users
router.get('/', getUsers);

//get user by 'id' - using UUID as record identifier*
router.get('/', getUser);

//post user
router.post('/', createUser);

//update user by 'id' - using UUID as record identifier*
router.put('/', updateUser);

//delete user by 'id' - using UUID as record identifier*
router.delete('/', deleteUser);

module.exports = router;
