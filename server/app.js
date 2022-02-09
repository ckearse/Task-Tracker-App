/** @format */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./db/db');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
	res.status(200);
	res.json({
		message: 'GET /',
		status: 200,
	});
});

const testConnection = async () => {
	try {
		await db.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

testConnection();

app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
