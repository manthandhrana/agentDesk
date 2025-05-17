const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const { v4: uuidv4 } = require("uuid");

const SALT_ROUNDS = 10;

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const uuid = uuidv4();

    const existsAdmin = await Admin.findOne({ email });

    if(existsAdmin){
            return res.status(401).json({ message: "Email Already Exists" });
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const admin = new Admin({ email, password: hashedPassword, uuid });
    await admin.save();

    res.cookie("uuid", uuid).json({ message: "admin Registered", uuid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }  
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, uuid: admin.uuid },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    res.cookie("uuid", admin.uuid);
    res.json({ message: "Login success", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

// DASHBOARD
exports.dashboard = (req, res) => {
  res.json({ message: "Welcome to dashboard", admin: req.admin });
};
