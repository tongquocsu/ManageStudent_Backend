import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    klass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
