import mongoose from "mongoose";

const { Schema } = mongoose;

const schoolAdministrationStaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
    },
    klass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model(
  "SchoolAdministrationStaff",
  schoolAdministrationStaffSchema
);
