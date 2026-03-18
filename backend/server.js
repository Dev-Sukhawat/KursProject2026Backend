import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import logger from "./utils/logger.js";

const app = express();
const port = 8080;

app.use(express.json());

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/auth", authRoutes);

app.get("/api", (req, res) => {
    res.send(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`, { err });
    res.status(500).json({ error: "Internal server error" });
    next();
});

app.listen(port, () => {
    logger.info(`🚀 Server redo på http://localhost:${port}`);
});