/** @format */

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/db');
const Task = require('./Task');
const bcrypt = require('bcrypt');

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
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
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

User.beforeCreate(async (user) => {
	if (user.password) {
		const salt = await bcrypt.genSaltSync(10, 'a');
		user.password = bcrypt.hashSync(user.password, salt);
	}
});

User.beforeUpdate(async (user) => {
	if (user.password) {
		const salt = await bcrypt.genSaltSync(10, 'a');
		user.password = bcrypt.hashSync(user.password, salt);
	}
});

User.prototype.validPassword = async (password, hash) => {
	return await bcrypt.compareSync(password, hash);
};

User.hasMany(Task, { hooks: true });

(async () => {
	await sequelize.sync();
})();

module.exports = User;
