import express from 'express';
import logger from './middleware/logger.js';

const app = express();

// Middlewares

app.use(logger);

// Routes

// Health check

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

export default app;