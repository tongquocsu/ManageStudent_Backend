import attendanceModel from "../models/attendanceModel.js";
import personModel from "../models/personModel.js";
import teacherModel from "../models/teacherModel.js";

export const markAttendance = async (req, res) => {
  const classID = await req.params.cid;
  const accountId = await req.account._id;
  const person = await personModel.findOne({ account: accountId });

  const teacher = await teacherModel.findOne({ person: person._id });

  try {
    const { student, status } = req.body;

    const attendance = new attendanceModel({
      teacher: teacher._id,
      classID,
      student,
      date: new Date(),
      status,
    });

    await attendance.save();
    return res.status(200).send({
      success: true,
      message: "Attendance marked successfully.",
      attendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in attendance func",
      error,
    });
  }
};

export const getAttendanceByClass = async (req, res) => {
  const classID = req.params.cid;
  try {
    const attendance = await attendanceModel
      .find({ classID: classID })
      .populate({
        path: "student",
        select: "person",
        populate: { path: "person", select: "name gender" },
      })
      .populate("classID", "name gradeLevel")
      .populate({
        path: "teacher",
        select: "person",
        populate: { path: "person", select: "name gender" },
      })
      .select("classID date status person teacher");

    return res.status(200).send({
      success: true,
      message: "OK",
      attendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};
