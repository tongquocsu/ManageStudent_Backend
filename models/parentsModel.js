const mongoose = require('mongoose');

const { Schema } = mongoose;

const parentsSchema = new Schema(
  {
  parentsID: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  tuitionFee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TuitionFee',
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  }
  },
  { timestamps: true }
);

export default mongoose.model('Parents', parentsSchema);

