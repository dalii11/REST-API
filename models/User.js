const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
