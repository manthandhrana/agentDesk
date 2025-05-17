const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.cookies.agentToken;
    if (!token) return res.status(401).json({ message: "Access Denied. No token." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.agentId = decoded.id;
    next();
  } catch (err) {
    console.error("agentAuth middleware error:", err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
