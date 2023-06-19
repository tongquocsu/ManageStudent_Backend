import mongoose from "mongoose";

const { Schema } = mongoose;

const tuitionFeeSchema = new Schema(
  {
    semesterTuitionFee: {
      type: mongoose.Decimal128,
      required: true,
    },
    miscellaneousFees: {
      type: mongoose.Decimal128,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parents",
      required: true,
    },
    accountantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accountant",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TuitionFee", tuitionFeeSchema);
