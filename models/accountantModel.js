const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountantSchema = new Schema(
    {
    accountantID: {
        type: Number,
        required: true,
        unique: true
    },
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

