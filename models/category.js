const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		enum: [
			"food", "health", "housing", "sport", "education", "transportation", "other"
		],
	},
});

module.exports = mongoose.model('Category', categorySchema);
