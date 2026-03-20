import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import roomsRouter from "./routes/rooms.js";
import bookingsRouter from "./routes/bookings.js";
import logger from "./utils/logger.js";
import {createServer} from "http";
import {Server} from "socket.io";

const app = express();
const httpServer = createServer(app);
const port = 8080;

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

export { io };

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomsRouter);
app.use("/api/bookings", bookingsRouter);

app.get("/api", (req, res) => {
    res.send(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`, { err });
    res.status(500).json({ error: "Internal server error" });
    next();
});

httpServer.listen(port, () => {
    logger.info(`🚀 Server running on http://localhost:${port}`);
});