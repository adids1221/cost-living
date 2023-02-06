const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
  birthday: {
    required: true,
    type: Date,
  },
  id: {
    type: String,
  }
});

// Create and export a model
module.exports = mongoose.model("User", userSchema);
