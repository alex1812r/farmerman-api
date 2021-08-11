
const CronJob = require('cron').CronJob;
const moment = require('moment');
const Plant = require('./PlantModel');

async function updatePlantsStartTime(skip = 0) {
	if(skip === 0) console.log('starting to format plant start time');

	const perPage = 50;
	const plants = await Plant
	  	.find({ customStartTime: null })
	  	.skip(skip)
	  	.limit(50);

  	if(Boolean(plants.length)) {
  		console.log(`updating ${plants.length} plants`);
		const updatePlantPromises = plants.map((plant) => {
			console.log(plant);
			const { startTime } = plant;
		  	const timeUTC = moment(startTime).utc().format('HH:mm:ss');
		  	const resetTime = parseInt(timeUTC.split(':').join(''));	return plant.updateOne({ resetTime });
	    });

		const res = await Promise.all(updatePlantPromises);
		console.log('updated plants!', JSON.stringify(res));
		// updatePlantsStartTime(skip + perPage);
	}	
}

// const job = new CronJob('0 35 9 * * *', updatePlantsStartTime);

module.exports = function () {
	// job.start();
}
