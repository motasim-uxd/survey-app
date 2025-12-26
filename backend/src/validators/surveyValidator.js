// validators/surveyValidator.js

export function validateSurveyRequest(req) {
  if (!req.body || !req.body.data) {
    throw new Error("Missing survey data");
  }

  let data;
  try {
    data = JSON.parse(req.body.data);
  } catch (err) {
    throw new Error("Invalid JSON payload");
  }

  /* ===============================
     Required string fields
  =============================== */
  const requiredStringFields = ["shopName", "email", "address"];

  for (const field of requiredStringFields) {
    if (
      !data[field] ||
      typeof data[field] !== "string" ||
      data[field].trim() === ""
    ) {
      throw new Error(`${field} is required`);
    }
  }

  if (data.remarks && typeof data.remarks !== "string") {
    throw new Error("remarks must be a string");
  }

  /* ===============================
     Work Types
  =============================== */
  if (!Array.isArray(data.workTypes) || data.workTypes.length === 0) {
    throw new Error("At least one work type is required");
  }

  if (!data.workTypes.every(w => typeof w === "string" && w.trim() !== "")) {
    throw new Error("Invalid workTypes format");
  }

  /* ===============================
     Dimensions
  =============================== */
  if (!Array.isArray(data.dimensions) || data.dimensions.length === 0) {
    throw new Error("At least one dimension is required");
  }

  let expectedImageCount = 0;

  data.dimensions.forEach((dim, index) => {
    const width = Number(dim.width);
    const height = Number(dim.height);

    if (
      Number.isNaN(width) ||
      Number.isNaN(height) ||
      width <= 0 ||
      height <= 0
    ) {
      throw new Error(
        `Invalid width/height at workType ${wtIndex}, dimension ${dimIndex}`
      );
    }

    // overwrite with coerced values
    dim.width = width;
    dim.height = height;


    if (
      typeof dim.imagesCount !== "number" ||
      dim.imagesCount < 0
    ) {
      throw new Error(`Invalid imagesCount at dimension index ${index}`);
    }

    expectedImageCount += dim.imagesCount;
  });

  /* ===============================
     Images consistency
  =============================== */
  const uploadedImages = req.files || [];

  if (uploadedImages.length !== expectedImageCount) {
    throw new Error(
      `Image count mismatch. Expected ${expectedImageCount}, received ${uploadedImages.length}`
    );
  }

  /* ===============================
     Attach parsed data for reuse
  =============================== */
  req.validatedSurveyData = data;
}
