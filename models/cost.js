const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const costSchema = new Schema({
    id: {
        type: String,
    },
    year: {
        type: String,
        required: [true, 'Missing year.']
    },
    month: {
        type: String,
        required: [true, 'Missing month.']
    },
    day: {
        type: String,
        required: [true, 'Missing day.']
    },
    category: {
        type: String,
        required: [true, 'Missing category.']
    },
    sum: {
        type: Number,
        required: [true, 'Missing sum.']
    },
    description: {
        type: String,
        required: [true, 'Missing description.']
    },
    userId: {
        type: String,
        required: [true, 'Missing user id.']
    }
});

// Export the model
module.exports = new mongoose.model("Cost", costSchema);