import mongoose from "mongoose";

const { Schema } = mongoose;

const receiptSchema = new Schema(
    {
    paymentDate: {
        type: Date,
        required: true
    },
    totalSum: {
        type: mongoose.Decimal128,
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parents',
        required: true
    },
    tuitionFeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TuitionFee',
        required: true
    }
    },
    { timestamps: true}
);

const Receipt = mongoose.model('Receipt', receiptSchema);
export default Receipt