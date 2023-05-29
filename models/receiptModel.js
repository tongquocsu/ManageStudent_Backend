const mongoose = require('mongoose');

const { Schema } = mongoose;

const receiptSchema = new Schema(
    {
    receiptID: {
        type: Number,
        required: true,
        unique: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    totalSum: {
        type: mongoose.Decimal128,
        required: true
    },
    parents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parents',
        required: true
    },
    tuitionFee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TuitionFee',
        required: true
    }
    },
    { timestamps: true}
);

export default mongoose.model('Receipt', receiptSchema);