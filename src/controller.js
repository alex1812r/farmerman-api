const Plant = require('./PlantModel');

module.exports.getPlants = async (req, res) => {
    const { from, to, x, y } = req.query;

    const query = {
        resetTime: {
            $gte: parseInt(from),
            $lte: parseInt(to)
        }
    };


    if(x) Object.assign(query, { 'land.x': parseInt(x) });
    if(y) Object.assign(query, { 'land.y': parseInt(y) });

	try {
        const plants = await Plant.find(query).sort({ resetTime: 1 });
		res.status(200).json({ plants });
	} catch(err) {
		res.status(200).send('error al obtener plantas');
		console.log(err);
	}
}

module.exports.createPlantMany = async (req, res) => {
    const data = req.body.plants;
    try {
        await Plant.deleteMany({ _id: { $in: data.map((item) => item._id ) }})
        const plants = await Plant.create(data, { upsert : true });
        res.status(201).json({ plants });
    } catch(err) {
        console.log(err);
        res.status(400).send(err.message)
    }
    
}