import mongoose from "mongoose";
import SurveySubmission from "../models/SurveySubmission.js";

/**
 * CREATE SURVEY
 */
const TEMP_SURVEYOR_ID = new mongoose.Types.ObjectId();

export const createSurvey = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);

    // Map uploaded images
    let fileIndex = 0;

    data.workTypes.forEach((wt) => {
      wt.dimensions.forEach((dim) => {
        const count = dim.imagesCount || 0;
        dim.images = req.files
          .slice(fileIndex, fileIndex + count)
          .map((f) => f.filename);
        fileIndex += count;
        delete dim.imagesCount;
      });
    });

    const survey = await SurveySubmission.create({
      ...data,
      surveyor: TEMP_SURVEYOR_ID
    });

    res.status(201).json(survey);
  } catch (error) {
    console.error("CREATE SURVEY ERROR:", error);
    res.status(400).json({ error: error.message });
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
