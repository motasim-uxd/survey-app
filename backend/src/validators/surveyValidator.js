// validators/surveyValidator.js

console.log("SURVEY VALIDATOR LOADED — VERSION 2");
export const validateSurveyRequest = (data) => {
  console.log("VALIDATOR HIT — workTypes:", data?.workTypes);
  if (!data || typeof data !== "object") {
    throw new Error("Invalid payload");
  }

  if (!Array.isArray(data.workTypes)) {
    throw new Error("Invalid workTypes format");
  }

  data.workTypes.forEach((wt, wtIndex) => {
    if (typeof wt.type !== "string" || !wt.type.trim()) {
      throw new Error(`Invalid workType at index ${wtIndex}`);
    }

    if (!Array.isArray(wt.dimensions)) {
      throw new Error(`Invalid dimensions array at workType ${wtIndex}`);
    }

    wt.dimensions.forEach((dim, dimIndex) => {
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

      if (
        typeof dim.imagesCount !== "number" ||
        dim.imagesCount < 0
      ) {
        throw new Error(
          `Invalid imagesCount at workType ${wtIndex}, dimension ${dimIndex}`
        );
      }
    });
  });
};

/*
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

  if (!Array.isArray(data.workTypes) || data.workTypes.length === 0) {
    throw new Error("At least one work type is required");
  }

  if (!data.workTypes.every(w => typeof w === "string" && w.trim() !== "")) {
    throw new Error("Invalid workTypes format");
  }


  /*if (!Array.isArray(data.dimensions) || data.dimensions.length === 0) {
    throw new Error("At least one dimension is required");
  }*/

    /*if (!Array.isArray(wt.dimensions)) {
      throw new Error(`Invalid dimensions array at workType ${wtIndex}`);
    }*/


/*
  wt.dimensions.forEach((dim, dimIndex) => {
    const width = Number(dim.width);
    const height = Number(dim.height);
    const imagesCount = Number(dim.imagesCount);

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

    if (
      Number.isNaN(imagesCount) ||
      imagesCount < 0
    ) {
      throw new Error(
        `Invalid imagesCount at workType ${wtIndex}, dimension ${dimIndex}`
      );
    }

    // Normalize values
    dim.width = width;
    dim.height = height;
    dim.imagesCount = imagesCount;

    expectedImageCount += imagesCount;
  });

  if (req.files.length !== expectedImageCount) {
    throw new Error(
      `Expected ${expectedImageCount} images but received ${req.files.length}`
    );
  }


/*  let expectedImageCount = 0;

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
*/
  /* ===============================
     Images consistency
  =============================== */
/*  const uploadedImages = req.files || [];

  if (uploadedImages.length !== expectedImageCount) {
    throw new Error(
      `Image count mismatch. Expected ${expectedImageCount}, received ${uploadedImages.length}`
    );
  }



  req.validatedSurveyData = data;
}*/
