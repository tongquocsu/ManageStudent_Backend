import mongoose from "mongoose";

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    name: {
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
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
      enum: ["student", "parent", "admin"],
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
