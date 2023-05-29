const mongoose = require('mongoose');

const { Schema } = mongoose;

const academicResultSchema = new Schema(
    {
    grades: {
        type: String,
        required: true
    },
    conductGrade: {
        type: String,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    parents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parents',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    },
    { timestamps: true }
);

export default mongoose.model('AcademicResult', academicResultSchema);
