import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import roomsRouter from "./routes/rooms.js";
import bookingsRouter from "./routes/bookings.js";
import logger from "./utils/logger.js";
import {createServer} from "http";
import {Server} from "socket.io";
import helmet from "helmet";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const isDev = process.env.NODE_ENV !== "production";


const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(helmet({
  // Explicit X-Frame-Options: DENY
  xFrameOptions: { action: "deny" },

  crossOriginResourcePolicy: { policy: "cross-origin" },

  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: isDev
        ? ["'self'", "'unsafe-eval'"]
        : ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: isDev
        ? ["'self'", "http://localhost:5173", "http://localhost:8080", "ws://localhost:8080", "ws://localhost:5173"]
        : ["'self'", "https://mydomain.com", "wss://mydomain.com"],
      objectSrc: ["'none'"],
      // frame-ancestors as backup alongside X-Frame-Options
      frameAncestors: ["'none'"],

      formAction: ["'self'"],
      baseUri: ["'self'"],
      framesSrc: ["'none'"],
    }
  }
}));

// Explicit middleware to guarantee headers on EVERY response
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  next();
});

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