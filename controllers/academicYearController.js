import academicYearModel from "../models/academicYearModel.js";

export const createAcademicYear = async (req, res) => {
  try {
    const { startYear, endYear } = req.body;

    const academicYear = new academicYearModel({
      startYear,
      endYear,
    });
    const savedAcademicYear = await academicYear.save();

    res.status(201).json({
      message: "Schedule created successfully",
      academicYear: savedAcademicYear,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid academicYear data", error: error.message });
  }
};
