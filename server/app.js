/** @format */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
	res.status(200);
	res.json({
		message: 'GET /',
		status: 200,
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
