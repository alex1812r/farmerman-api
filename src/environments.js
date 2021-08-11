const dotenv = require('dotenv');

dotenv.config();

const { env } = process;
module.exports = {
	PORT: env.PORT || '5000',
	MONGOOSE_URL: env.MONGOOSE_URL
};