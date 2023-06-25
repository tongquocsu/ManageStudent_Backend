import mongoose from "mongoose";

const { Schema } = mongoose;

const accountantSchema = new Schema(
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
export default mongoose.model('Accountant', accountantSchema);