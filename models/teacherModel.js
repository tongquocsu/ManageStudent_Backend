import mongoose from "mongoose";

const { Schema } = mongoose;

const teacherSchema = new Schema(
  {
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    academicResults: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicResult",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
