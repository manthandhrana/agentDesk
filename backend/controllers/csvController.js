const fs = require('fs');
const csv = require('csv-parser');
const Task = require('../models/Task');
const Agent = require('../models/Agent');

exports.uploadCSV = async (req, res) => {
  try {
    const agents = await Agent.find();
    if (agents.length < 1) return res.status(400).json({ message: 'No agents available' });

    const results = await parseCSV(req.file.path); // using helper from above
    const tasksPerAgent = Math.floor(results.length / agents.length);
    let extra = results.length % agents.length;
    let taskIndex = 0;

    for (let i = 0; i < agents.length; i++) {
      let count = tasksPerAgent + (extra-- > 0 ? 1 : 0);
      for (let j = 0; j < count; j++) {
        const { FirstName, Phone, Notes } = results[taskIndex++];
        await Task.create({
          firstName: FirstName,
          phone: Phone,
          notes: Notes,
          assignedTo: agents[i]._id
        });
      }
    }

    fs.unlinkSync(req.file.path); // Clean up the file
    res.status(200).json({ message: 'CSV processed and tasks distributed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
