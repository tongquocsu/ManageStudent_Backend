import subjectModel from "../models/subjectModel.js";

export const createSubject = async (req, res) => {
  try {
    const { name, teacher } = req.body;

    const subject = new subjectModel({
      name,
      teacher,
    });
    const savedSubject = await subject.save();

    res.status(201).json({
      message: "Schedule created successfully",
      subject: savedSubject,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid subject data", error: error.message });
  }
};

