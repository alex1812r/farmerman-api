const dotenv = require('dotenv');

dotenv.config();

const { env } = process;
module.exports = {
	PORT: env.PORT || '5000',
	MONGOOSE_URL: env.MONGOOSE_URL || 'mongodb://localhost:27017/plant_vs_undead'
};