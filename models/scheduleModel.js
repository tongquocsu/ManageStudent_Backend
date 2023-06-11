import mongoose from "mongoose";

const { Schema } = mongoose;

const scheduleSchema = new Schema(
    {
    semester: {
        type: String,
        required: true
    },
    classPeriod: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    academicYear: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicYear',
        required: true
    }
    },
    { timestamps: true}
);

export default mongoose.model('Schedule', scheduleSchema);

