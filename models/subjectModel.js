const mongoose = require('mongoose');

const { Schema } = mongoose;

const subjectSchema = new Schema(
    {
    subjectID: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
    },
    { timestamps: true}
);

export default mongoose.model('Subject', subjectSchema);

