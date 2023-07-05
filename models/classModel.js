import mongoose from "mongoose";
import schoolModel from "./schoolModel.js";
import teacherModel from "./teacherModel.js";
const { Schema } = mongoose;

const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gradeLevel: {
      type: String,
      required: true,
    },
    classYear: {
      type: Date,
      required: true,
    },
    classEnrollment: {
      type: String,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: schoolModel,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: teacherModel,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Classes", classSchema);
