import mongoose from "mongoose";

const { Schema } = mongoose;

const personSchema = new Schema(
  {
    name: {
      type: String,
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
    mobileNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Person", personSchema);
