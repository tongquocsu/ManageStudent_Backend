const mongoose = require('mongoose');

const { Schema } = mongoose;

const classroomSchema = new Schema(
    {
    classroomID: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
    },
    { timestamps: true}
);

export default mongoose.model('Classroom', classroomSchema);

