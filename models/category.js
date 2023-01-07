const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		enum: [
			'Home',
			'Health',
			'Housing',
			'Sport',
			'Education',
			'Transportation',
			'Other'
		],
	},
});

module.exports = mongoose.model('Category', categorySchema);
