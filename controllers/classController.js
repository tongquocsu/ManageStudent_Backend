import classModel from "../models/classModel.js";

export const getAllClassByTeacher = async (req, res) => {
  const teacherId = req.params.tid;
  try {
    const classes = await classModel
      .find({ teacher: teacherId })
      .select("name gradeLevel classYear classEnrolment school")
      .populate("school", "name type address");
    return res.status(200).send({
      success: true,
      message: "OK",
      classes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};
