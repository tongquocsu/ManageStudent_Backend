import mongoose from "mongoose";

const { Schema } = mongoose;

const scheduleSchema = new Schema(
  {
    semester: {
      type: String,
      required: true,
    },
    classPeriod: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", scheduleSchema);
