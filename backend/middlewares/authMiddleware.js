const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  const uuid = req.cookies.uuid;

  if (!token || !uuid) {
    return res.status(401).json({ message: "Unauthorized Admin" });
  }

  // Basic token format check
  if (typeof token !== 'string' || token.split('.').length !== 3) {
    return res.status(400).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid token structure" });
    }

    if (decoded.uuid !== uuid) {
      return res.status(401).json({ message: "Invalid UUID" });
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Decode Error:", err.message);
    return res.status(401).json({ message: `Token error` });
  }
};

module.exports = authMiddleware;
