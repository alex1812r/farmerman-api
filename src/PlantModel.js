const mongoose = require('mongoose');
const utils = require('./utils');

const WATER_TYPE = 'WATER';

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

const ToolSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	type: {
		type: String,
	},
	startTime: {
		type: Date,
		required: 'active tool start time required'
	},
	endTime: {
		type: Date,
		required: 'active tool end time required'
	},
	count: {
		type: Number
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
	activeTools: [ToolSchema],
	resetStartTime: {
		type: Number,
	},
	resetEndTime: {
		type: Number
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

PlantItemSchema.pre('save', async function(next) {
		const water = this.activeTools.find((tool) => tool.type === WATER_TYPE);
		if(!water) throw new Error(`plant haven't ${WATER_TYPE} tool active`);
		const { startTime, endTime } = water;
		this.resetStartTime = utils.datetimeToNumber(startTime);
		this.resetEndTime = utils.datetimeToNumber(endTime);
    next()
})

module.exports = mongoose.model('plants', PlantItemSchema);
