import express from "express";
import cors from "cors";
const app = express();

const CorsOptions = {
    origin: ["http://localhost:5173"]
}

const port = 8080;

app.use(cors(CorsOptions))

app.get("/api", (reg, res) => {
    res.json({
        bookings: {
            id: "2",
            userId: "2",
            userName: "Jane Smith",
            roomId: "6",
            roomName: "Conference Room B",
            startDate: new Date(Date.now() - 86400000),
            endDate: new Date(Date.now() + 86400000),
            status: "active",
        }
    })
})

app.listen(port, () => {
    console.log("Server is running on port http://localhost:8080");
})
