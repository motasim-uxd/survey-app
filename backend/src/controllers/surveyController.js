import mongoose from "mongoose";
import SurveySubmission from "../models/SurveySubmission.js";
import { validateSurveyRequest } from "../validators/surveyValidator.js";

/**
 * CREATE SURVEY
 * - Validates request
 * - Maps uploaded images safely
 * - Persists survey
 */
const TEMP_SURVEYOR_ID = new mongoose.Types.ObjectId();

export const createSurvey = async (req, res) => {
  try {
    /* =================================================
       STEP 1: VALIDATE REQUEST (STRUCTURE + CONSISTENCY)
       - Parses JSON
       - Validates fields
       - Validates dimensions
       - Validates image count
       - Attaches parsed data to req
    ================================================= */
    validateSurveyRequest(req);

    // Safe, validated, already-parsed data
    const data = req.validatedSurveyData;

    /* =================================================
       STEP 2: HARD RESET IMAGES FROM CLIENT JSON
       - Client images are NEVER trusted
    ================================================= */
    data.workTypes.forEach(wt => {
      wt.dimensions.forEach(dim => {
        delete dim.images;
      });
    });

    /* =================================================
       STEP 3: MAP UPLOADED IMAGES (ORDER-SAFE)
    ================================================= */
    let fileIndex = 0;

    data.workTypes.forEach(wt => {
      wt.dimensions.forEach(dim => {
        const count = dim.imagesCount || 0;

        dim.images = req.files
          .slice(fileIndex, fileIndex + count)
          .map(file => file.filename);

        fileIndex += count;
        delete dim.imagesCount; // no longer needed
      });
    });

    /* =================================================
       STEP 4: SAVE TO DATABASE
    ================================================= */
    const survey = await SurveySubmission.create({
      ...data,
      surveyor: TEMP_SURVEYOR_ID
    });

    res.status(201).json(survey);

  } catch (error) {
    console.error("CREATE SURVEY ERROR:", error.message);

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * GET ALL SURVEYS (Admin)
 */
export const getAllSurveys = async (req, res) => {
  try {
    const surveys = await SurveySubmission
      .find()
      .sort({ createdAt: -1 });

    res.json(surveys);
  } catch (error) {
    console.error("GET ALL SURVEYS ERROR:", error);
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
};

/**
 * GET SURVEY BY ID
 */
export const getSurveyById = async (req, res) => {
  try {
    const survey = await SurveySubmission.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    res.json(survey);
  } catch (error) {
    console.error("GET SURVEY ERROR:", error);
    res.status(500).json({ error: "Invalid survey ID" });
  }
};
