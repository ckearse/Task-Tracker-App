/** @format */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const { testConnection } = require('./db/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

testConnection();

app.get('/', (req, res, next) => {
	res.status(200);
	res.json({
		message: 'GET /',
		status: 200,
	});
});

app.use('/users', require('./routes/user'));

app.use((err, req, res, next) => {
	//TODO: handle dev errors
	//TODO: handle prod errors

	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: err,
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
