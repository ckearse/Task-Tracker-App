/** @format */

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/db');

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
	},
	{
		modelName: 'user',
		tableName: 'users',
		sequelize,
	}
);

(async () => {
	await sequelize.sync();
})();

module.exports = User;
