const Plant = require('./PlantModel');

module.exports.getPlants = async (req, res) => {
    const { from, to, x, y } = req.query;

    const query = {
        resetTime: {
            $gte: parseInt(from),
            $lte: parseInt(to)
        }
    };

    if(x) Object.assign(query, { x });
    if(y) Object.assign(query, { y });

    console.log('query', query);

	try {
		const plants = await Plant.find(query).sort({ resetTime: 1 });
		res.status(200).json({ plants });
	} catch(err) {
		res.status(200).send('error al obtener plantas');
		console.log(err);
	}
}

module.exports.createPlantMany = async (req, res) => {
    try {
        const plants = await Plant.create(req.body.plants, { upsert : true });
        res.status(201).json({ plants });
    } catch(err) {
        console.log(err);
        res.status(400).send(err.message)
    }
    
}