const Agent = require("../models/Agent");
const Task = require("../models/Task");
const xlsx = require("xlsx");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 3);

  const agent = new Agent({ name, email, mobile, password: hashedPassword });
  await agent.save();

  res.json({ message: "Agent added", agent });
};

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const ext = req.file.originalname.split(".").pop().toLowerCase();
    if (!["csv", "xlsx", "xls"].includes(ext))
      return res.status(400).json({ message: "Invalid file type" });

    const file = xlsx.readFile(req.file.path);
    const sheet = file.Sheets[file.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (!data.length) return res.status(400).json({ message: "File is empty" });

    const agents = await Agent.find();
    if (!agents.length) return res.status(400).json({ message: "No agents found" });

    const tasksPerAgent = Math.floor(data.length / agents.length);
    let extra = data.length % agents.length;
    let index = 0;

    for (let i = 0; i < agents.length; i++) {
      let count = tasksPerAgent + (extra > 0 ? 1 : 0);
      if (extra > 0) extra--;

      const assignedTasks = data.slice(index, index + count);
      index += count;

      for (const task of assignedTasks) {
        const newTask = new Task({
          agentId: agents[i]._id,
          name: task.FirstName || task.name || "",
          phone: task.Phone || task.phone || "",
          task: task.Notes || task.notes || task.Task || task.task || ""
        });

        const savedTask = await newTask.save();

        // ✅ Add task ID into agent's tasks array
        await Agent.findByIdAndUpdate(
          agents[i]._id,
          { $push: { tasks: savedTask._id } },
          { new: true }
        );
      }
    }

    res.json({ message: "Tasks distributed and added to agents successfully" });
  } catch (error) {
    console.error("Error in uploadCSV:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAgentTasks = async (req, res) => {
  try {
    const agents = await Agent.find().populate("tasks");
    const response = agents.map(agent => ({
      agent: agent.name,
      tasks: agent.tasks
    }));

    res.json(response);
  } catch (error) {
    console.error("Error in getAgentTasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.agentLogin = async (req, res) => {
  const { email, password } = req.body;

  const agent = await Agent.findOne({ email });
  if (!agent) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, agent.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  agent.token = token;
  await agent.save();

  res.cookie("agentToken", token);
  res.json({ message: "Login successful", token });
};


exports.getMyTasks = async (req, res) => {
  try {
    const agent = await Agent.findById(req.agentId).populate("tasks");
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    res.json({ tasks: agent.tasks });
  } catch (error) {
    console.error("getMyTasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
