var mongoose = require("mongoose");

const assignment1_schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  phone: String,
  email: String,
  contact_input: String,
});

const Assignment1 = mongoose.model("Assignment1", assignment1_schema);

module.exports = Assignment1;
