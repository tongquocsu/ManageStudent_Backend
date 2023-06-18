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

const ClassRoom = mongoose.model("Classroom", classroomSchema);
export default ClassRoom
