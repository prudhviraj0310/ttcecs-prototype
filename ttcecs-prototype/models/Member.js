import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
    MNo: {
        type: String,
        required: [true, 'Please provide Member Number'],
        unique: true,
    },
    Name: {
        type: String,
        required: [true, 'Please provide Name'],
    },
    Mobile_No: {
        type: String,
        required: [true, 'Please provide Mobile Number'],
    },
    Address: {
        type: String,
    },
    DOA: {
        type: Date,
    },
    Gender: {
        type: String,
    },
    DOB: {
        type: Date,
    },
    Photo: {
        type: String, // URL path to image
    },
}, { timestamps: true });

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
