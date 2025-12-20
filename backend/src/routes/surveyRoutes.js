import express from "express";
import { createSurvey, getAllSurveys, getSurveyById } from "../controllers/surveyController.js";
//import { protect } from "../middleware/authMiddleware.js"; // JWT auth middleware
import upload from "../config/multer.js";

const router = express.Router();

// Create submission (protected)

//router.post("/", createSurvey); // basic submit (no images)
router.get("/", getAllSurveys);
router.post("/", upload.array("images", 50), createSurvey);
router.get("/:id", getSurveyById);
/*router.post("/", protect, createSurvey);
router.get("/my", protect, getMySurveys);
router.get("/", protect, getAllSurveys);
router.get("/:id", protect, getSurveyById);
*/

export default router;
