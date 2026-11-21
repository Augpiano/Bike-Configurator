import express from 'express';

const app = express();

// Middlewares

// Routes

// Health check

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

export default app;