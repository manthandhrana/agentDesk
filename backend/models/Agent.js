const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
  token: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]  // ✅ relational array
});

module.exports = mongoose.model("Agent", agentSchema);
