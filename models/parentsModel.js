import mongoose from "mongoose";

const { Schema } = mongoose;

const parentsSchema = new Schema(
  {
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      required: true
    },
    tuitionFee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TuitionFee',
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model('Parents', parentsSchema);

