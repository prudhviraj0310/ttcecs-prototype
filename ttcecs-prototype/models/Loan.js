import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
    LNo: {
        type: String,
        required: true,
        unique: true,
    },
    LMNo: {
        type: String,
        required: true,
        ref: 'Member',
        index: true,
    },
    LType: {
        type: String,
        required: true,
    },
    LAmt: {
        type: Number,
        required: true,
    },
    LBal: {
        type: Number,
        required: true,
    },
    LROI: {
        type: Number,
        required: true,
    },
    LDt: {
        type: Date,
        required: true,
    },
    LStatus: {
        type: String,
        enum: ['Active', 'Closed', 'Defaulted'],
        default: 'Active',
    },
    EMI: {
        type: Number,
    },
    Tenure: {
        type: Number, // in months
    },
}, { timestamps: true });

export default mongoose.models.Loan || mongoose.model('Loan', LoanSchema);
