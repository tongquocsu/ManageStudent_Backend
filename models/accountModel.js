import mongoose from "mongoose";

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
      enum: [
        "student",
        "teacher",
        "parent",
        "admin",
        "accountant",
        "schoolStaff",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
