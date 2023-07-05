import mongoose from "mongoose";

const { Schema } = mongoose;

const classroomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Classroom", classroomSchema);
