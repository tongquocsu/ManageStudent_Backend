import mongoose from "mongoose";

const { Schema } = mongoose;

const schoolAdministrationStaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
    },
    klass: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model(
  "SchoolAdministrationStaff",
  schoolAdministrationStaffSchema
);
