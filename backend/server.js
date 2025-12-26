import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import surveyRoutes from "./src/routes/surveyRoutes.js";
import path from "path";


dotenv.config();

const app = express();

// Middleware
app.use(cors({origin:true, credentials:true}));
app.use(express.json({ limit: "20mb" }));
app.use("/api/surveys", surveyRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.set("trust proxy", 1);

// Connect DB
connectDB();

// Basic Test Route
app.get("/", (req, res) => {
  res.send("Survey Backend API Running");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
