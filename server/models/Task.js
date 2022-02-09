/** @format */

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/db');

class Task extends Model {}

Task.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primary: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		details: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		completed: {
			type: DateTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.UUIDV4,
			allowNull: false,
		},
	},
	{ sequelize }
);
