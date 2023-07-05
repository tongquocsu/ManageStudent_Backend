import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema(
    {
    name: {
        type: String,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
    },
    { timestamps: true}
);
export default mongoose.model('Admin', adminSchema);