/** @format */

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/db');

class Task extends Model {}

Task.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
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
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
	},
	{ modelName: 'task', tableName: 'tasks', sequelize }
);

(async () => {
	await sequelize.sync();
})();

module.exports = Task;
