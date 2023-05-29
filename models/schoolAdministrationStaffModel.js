const mongoose = require('mongoose');

const { Schema } = mongoose;

const schoolAdministrationStaffSchema = new mongoose.Schema(
    {
    staffID: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }
    },
    { timestamps: true}
);

export default mongoose.model('SchoolAdministrationStaff', schoolAdministrationStaffSchema);

