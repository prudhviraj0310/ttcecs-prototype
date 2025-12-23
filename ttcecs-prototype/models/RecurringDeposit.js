import mongoose from 'mongoose';

const RecurringDepositSchema = new mongoose.Schema({
    RDNo: {
        type: String,
        required: true,
        unique: true,
    },
    MNo: {
        type: String,
        required: true,
        ref: 'Member',
        index: true,
    },
    RDAmt: {
        type: Number,
        required: true,
    },
    ROI: {
        type: Number,
        required: true,
    },
    Period: {
        type: Number, // in months
        required: true,
    },
    SDate: {
        type: Date,
        required: true,
    },
    EDate: {
        type: Date,
    },
    TotalPaid: {
        type: Number,
        default: 0,
    },
    InstallmentsPaid: {
        type: Number,
        default: 0,
    },
    Status: {
        type: String,
        enum: ['Active', 'Matured', 'Closed', 'Defaulted'],
        default: 'Active',
    },
    ACNo: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.models.RecurringDeposit || mongoose.model('RecurringDeposit', RecurringDepositSchema);
