import mongoose from "mongoose";

const { Schema } = mongoose;

const subjectSchema = new Schema(
    {
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

