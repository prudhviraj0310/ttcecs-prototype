import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema({
    memberNumber: {
        type: String,
        required: [true, 'Please provide Member Number'],
        index: true,
    },
    otp: {
        type: String,
        required: [true, 'Please provide OTP'],
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Auto-delete expired OTPs
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.OTP || mongoose.model('OTP', OTPSchema);
