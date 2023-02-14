/*Developers Details:
* Adi Mordo - 313531634
* Stav Gallula - 205969868
*/

const mongoose = require("mongoose");
const Category = require("./category").schema;
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
        type: Category,
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
    user_id: {
        type: String,
        required: [true, 'Missing user id.']
    }
});


// Create and export a model
module.exports = mongoose.model("Cost", costSchema);