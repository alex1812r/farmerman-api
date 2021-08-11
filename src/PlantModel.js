const mongoose = require('mongoose');
const moment = require('moment');

const LandSchema = mongoose.Schema({
	landId: {
		type: String,
        required: true,
	},
	x: {
		type: Number,
        required: true,
	},
	y: {
		type: Number,
        required: true,
	}
});

const PlantSchema = new mongoose.Schema({
	iconUrl: {
		type: String,
	}
});

const PlantItemSchema = new mongoose.Schema({
	ownerId: {
		type: String,
		required: true,
		lowercase: true,
		trim: true
	},
	startTime: {
		type: Date,
		required: true,
	},
	plantId: {
		type: Number,
		required: true
	},
	plantUnitId: {
		type: Number,
		required: true
	},
	plantElement: {
		type: String,
		required: true
	},
	land: {
		type: LandSchema,
		default: {}
	},
	plant: {
		type: PlantSchema,
		default: {}
	},
	resetTime: {
		type: Number,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
});

PlantItemSchema.pre('save', function(next) {
    const startTime = moment(this.startTime).utc().format('HH:mm:ss');
    this.resetTime = parseInt(startTime.split(':').join(''));
    next()
})

module.exports = mongoose.model('plants', PlantItemSchema);
