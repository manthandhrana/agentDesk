const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

// Enable CORS for all routes and methods
app.use(cors({
  origin: process.env.CORS_URL,              // You can replace "*" with your frontend URL in production
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true         // Allow credentials like cookies
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/agentRoutes"));

// Swagger docs
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = app;
