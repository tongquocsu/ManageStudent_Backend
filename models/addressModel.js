const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
  addressID: {
    type: Number,
    required: true,
    unique: true
  },
  addressDetail: {
    type: String,
    required: true
  }
  },
  { timestamps: true}
);

export default mongoose.model('Address', addressSchema);

