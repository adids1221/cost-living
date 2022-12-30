const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		enum: ['Home',
			'Transportation',
			'Entertainment',
			'Food',
			'Health',
			'Sport',
			'Private',
			'Education'],
	},
});

module.exports = mongoose.model('Category', categorySchema);
