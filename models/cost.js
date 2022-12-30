const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const costSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
        required: true,
    },
    description: String,
    date: Date,
    price: Number,
});

// Export the model
module.exports = new mongoose.model("Cost", costSchema);