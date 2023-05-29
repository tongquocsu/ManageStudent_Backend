const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema(
  {
  classID: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  gradeLevel: {
    type: String,
    required: true
  },
  classYear: {
    type: Date,
    required: true
  },
  classEnrollment: {
    type: String,
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
  },
  { timestamps: true}
);

export default mongoose.model('Class', classSchema);
