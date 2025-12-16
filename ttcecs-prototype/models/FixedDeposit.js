import mongoose from 'mongoose';

const FixedDepositSchema = new mongoose.Schema({
    fdNo: {
        type: Number, // Assuming ID is numeric based on mockDb examples (1001)
        required: true,
        unique: true,
    },
    fdMNo: {
        type: String,
        required: true,
        ref: 'Member' // Optional: if we want to populate later
    },
    fdAmt: {
        type: Number,
        required: true,
    },
    fdROI: {
        type: Number,
        required: true,
    },
    fdDt: {
        type: Date,
        required: true,
    },
    fdDays: {
        type: Number,
    },
    fdStatus: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.models.FixedDeposit || mongoose.model('FixedDeposit', FixedDepositSchema);
