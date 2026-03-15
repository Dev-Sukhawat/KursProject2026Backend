import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const port = 8080;

app.use(express.json());

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);

app.get("/api", (req, res) => {
    res.send(`Server is running on http://localhost:${port}`);
});

app.listen(port, () => {
    console.log(`🚀 Server redo på http://localhost:${port}`);
});