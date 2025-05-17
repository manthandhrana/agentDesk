const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  task: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
