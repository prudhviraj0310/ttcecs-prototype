import mongoose from 'mongoose';

const DayBookSchema = new mongoose.Schema({
    dbTranDt: {
        type: Date,
        required: true,
    },
    dbEDPNo: {
        type: String,
        required: true,
        ref: 'Member'
    },
    dbParticular: {
        type: String,
        required: true,
    },
    dbAmt: {
        type: Number,
        required: true,
    },
    dbHead: {
        type: String,
    },
    dbModeOfPay: {
        type: String,
    },
    dbChqNo: {
        type: String,
    },
    dbPayRec: {
        type: String, // 'Rec' or 'Pay'
    },
    dbRtNo: {
        type: Number,
    }
}, { timestamps: true });

export default mongoose.models.DayBook || mongoose.model('DayBook', DayBookSchema);
