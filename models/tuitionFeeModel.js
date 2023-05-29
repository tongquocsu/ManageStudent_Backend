const mongoose = require('mongoose');

const { Schema } = mongoose;

const tuitionFeeSchema = new Schema(
    {
    tuitionFeeID: {
        type: Number,
        required: true,
        unique: true
    },
    semesterTuitionFee: {
        type: mongoose.Decimal128,
        required: true
    },
    miscellaneousFees: {
        type: mongoose.Decimal128,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    parents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parents',
        required: true
    },
    accountant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accountant',
        required: true
    },
    },
    { timestamps: true}
);

export default mongoose.model('TuitionFee', tuitionFeeSchema);