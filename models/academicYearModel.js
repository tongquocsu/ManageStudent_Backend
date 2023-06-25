import mongoose from "mongoose";

const { Schema } = mongoose;

const academicYearSchema = new Schema(
  {
    startYear: {
      type: Date,
      required: true,
      unique: true,
    },
    endYear: {
      type: Date,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AcademicYear", academicYearSchema);