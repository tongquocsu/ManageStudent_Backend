import mongoose from "mongoose";

const { Schema } = mongoose;

const studentRecordsSchema = new Schema(
  {
    information: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parents",
      required: true,
    },
    feeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TuitionFee",
      required: true,
    },
    processStudying: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const StudentRecords = mongoose.model('StudentRecords', studentRecordsSchema);
export default StudentRecords