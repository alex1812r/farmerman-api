const Router = require('express').Router;
const controller = require('./controller');

const router = Router();

router.get('/', (req, res) => {
	res.send('working...');
})

router.get('/plants', controller.getPlants);

router.post('/plants', controller.createPlantMany);

module.exports = router;