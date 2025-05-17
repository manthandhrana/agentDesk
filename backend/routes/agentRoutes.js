const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");
const agentAuth = require("../middlewares/agentAuth");
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /api/agents:
 *   post:
 *     summary: Add a new agent
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               mobile:
 *                 type: string
 *                 description: Include country code (e.g. +911234567890)
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Agent created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/agents",authMiddleware, agentController.addAgent);

/**
 * @swagger
 * /api/upload-csv:
 *   post:
 *     summary: Upload CSV or Excel file
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: File uploaded and processed successfully
 *       400:
 *         description: Invalid file format
 */
router.post("/upload-csv",authMiddleware, upload.single("file"), agentController.uploadCSV);

/**
 * @swagger
 * /api/agent-tasks:
 *   get:
 *     summary: Get all agents with their distributed tasks
 *     tags: [Agent]
 *     responses:
 *       200:
 *         description: List of agents with tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   agentId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   tasks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                         phone:
 *                           type: string
 *                         notes:
 *                           type: string
 *       500:
 *         description: Server error
 */
router.get("/agent-tasks",authMiddleware, agentController.getAgentTasks);

/**
 * @swagger
 * /api/agent-login:
 *   post:
 *     summary: Agent login with email and password
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post("/agent-login", agentController.agentLogin);

/**
 * @swagger
 * /api/my-tasks:
 *   get:
 *     summary: Get tasks assigned to the logged-in agent
 *     tags: [Agent]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks assigned to the logged-in agent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       task:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/my-tasks", agentAuth, agentController.getMyTasks);

module.exports = router;
