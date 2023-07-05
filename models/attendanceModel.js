import mongoose from "mongoose";
import classModel from "./classModel.js";
const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
    classID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: classModel,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
