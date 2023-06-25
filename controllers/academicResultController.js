import { default as academicResultsModel } from "../models/academicResultsModel.js";
import personModel from "../models/personModel.js";
import teacherModel from "../models/teacherModel.js";

export const createAcademicResult = async (req, res) => {
  const accountId = await req.account._id;

  const person = await personModel.findOne({ account: accountId });

  const teacher = await teacherModel.findOne({ person: person._id });

  const classID = await req.params.cid;
  const studentID = await req.params.sid;

  try {
    const { subject, conductGrade, grades, parents } = req.body;

    const academicResult = new academicResultsModel({
      teacher,
      classID,
      student: studentID,
      subject,
      conductGrade,
      grades,
      parents,
    });
    const savedAcademicResult = await academicResult.save();

    res.status(201).json({
      message: "Academic Result created successfully",
      academicResult: savedAcademicResult,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid academicResult data", error: error.message });
  }
};

export const getAcademicResult = async (req, res) => {
  const classID = req.params.cid;
  try {
    const academicResult = await academicResultsModel
      .find({
        classID: classID,
      })
      .populate("classID", "name gradeLevel")
      .populate({
        path: "student",
        select: "person",
        populate: { path: "person", select: "name gender" },
      })
      .populate("subject", "name")
      .select("classID student subject conductGrade grades");

    return res.status(200).send({
      success: true,
      message: "OK",
      academicResult,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch academicResult" });
  }
};

export const updateAcademicResult = async (req, res) => {
  const academicResultId = await req.params.rid;

  try {
    const { conductGrade, grades } = req.body;

    const academicResult = await academicResultsModel.findById(
      academicResultId
    );

    if (!academicResult) {
      return res.status(404).json({
        message: "Academic Result not found",
      });
    }

    await academicResultsModel.findByIdAndUpdate(academicResultId, {
      $set: {
        grades,
        conductGrade,
      },
    });

    const savedAcademicResult = await academicResult.save();

    res.status(200).json({
      message: "Academic Result updated successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid academicResult data", error: error.message });
  }
};

export const getAcademicResultByStudentID = async (req, res) => {
  const studentID = req.params.sid;
  try {
    const academicResult = await academicResultsModel
      .find({
        student: studentID,
      })
      .populate("classID", "name gradeLevel")
      .populate({
        path: "teacher",
        select: "person",
        populate: {
          path: "person",
          select: "name gender mobileNumber account",
          populate: { path: "account", select: "email" },
        },
      })
      .populate("subject", "name")
      .select("classID student subject conductGrade grades");

    return res.status(200).send({
      success: true,
      message: "OK",
      academicResult,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch academicResult" });
  }
};
