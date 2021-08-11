const mongoose = require('mongoose');
const { MONGOOSE_URL } = require('./environments');

module.exports = async function connectDatabase() {
	const database = await mongoose.connect(
		MONGOOSE_URL, 
		{
			useNewUrlParser: true, 
			useUnifiedTopology: true,
			useCreateIndex: true,	
			useFindAndModify: true
		}
	);
	console.log(
		'Base de datos conectada\n',
		MONGOOSE_URL
	);
	return database;
}