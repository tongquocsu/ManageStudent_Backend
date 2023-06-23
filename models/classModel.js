import mongoose from "mongoose";

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
      ref: "School",
      required: true,
    },
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);
export default Class
