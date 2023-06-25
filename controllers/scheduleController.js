import scheduleModel from "../models/scheduleModel.js";

// xem thời khóa biểu
export const getScheduleStudent = async (req, res) => {
  try {
    const schedules = await scheduleModel
      .find()
      .select(
        "semester classPeriod classroom subject teacher academicYear klass time"
      )
      .populate("classroom", "name type")
      .populate("klass", "name gradeLevel classEnrollment")
      .populate("academicYear", "startYear endYear")
      .populate("subject", "name")
      .populate({
        path: "teacher",
        populate: {
          path: "person",
          select: "name mobileNumber account dateOfBirth gender",
          populate: {
            path: "account",
            select: "username email",
          },
        },
        select: "person gender",
      });
    return res.status(200).send({
      success: true,
      message: "OK",
      schedules,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch schedules" });
  }
};

export const createScheduleStudent = async (req, res) => {
  try {
    const {
      semester,
      classPeriod,
      classroom,
      subject,
      teacher,
      academicYear,
      klass,
      time,
    } = req.body;

    const schedule = new scheduleModel({
      semester,
      classPeriod,
      classroom,
      subject,
      teacher,
      academicYear,
      klass,
      time,
    });
    const savedSchedule = await schedule.save();

    res.status(201).json({
      message: "Schedule created successfully",
      schedule: savedSchedule,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid schedule data", error: error.message });
  }
};

// xem lịch giảng dạy
export const getScheduleTeacher = async (req, res) => {
  const teacherId = req.params.tid;
  try {
    const schedules = await scheduleModel
      .find({ teacher: teacherId })
      .select(
        "semester classPeriod classroom subject academicYear klass time"
      )
      .populate("classroom", "name type")
      .populate("klass", "name gradeLevel classEnrollment")
      .populate("academicYear", "startYear endYear")
      .populate("subject", "name");
    return res.status(200).send({
      success: true,
      message: "OK",
      schedules,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch schedules" });
  }
};
