const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');
const { PORT } = require('./environments');

module.exports = function startServer() {
	const server = express();
	server.use(cors({}));
    server.use(express.json());
	server.use(morgan('dev'));
	server.use(router);

	server.listen(PORT, () => {
		console.log(`Server on Port ${PORT}`);
	})

	return server;
}

