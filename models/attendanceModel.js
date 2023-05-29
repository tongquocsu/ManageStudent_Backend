const mongoose = require('mongoose');

const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }
  },
  { timestamps: true}
);

export default mongoose.model('Attendance', attendanceSchema);