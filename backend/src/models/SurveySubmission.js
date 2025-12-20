import mongoose from "mongoose";

const workTypeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Signboard, Wall Rack, Desk, Vinyl
  dimensions: [
    {
      height: { type: String, required: true },
      width: { type: String, required: true },
      images: [{ type: String }] // URLs or filenames
    }
  ]
});

const surveySubmissionSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  workTypes: [workTypeSchema],
  remarks: { type: String },
  surveyor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SurveySubmission", surveySubmissionSchema);
