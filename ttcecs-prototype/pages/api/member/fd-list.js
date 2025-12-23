import dbConnect from '../../../lib/dbConnect';
import FixedDeposit from '../../../models/FixedDeposit';

// Mock FD data for local testing
const MOCK_FDS = {
    '12345': [
        { fdNo: 1001, fdMNo: '12345', fdAmt: 50000, fdROI: 7.5, fdDt: '2024-01-10', fdDays: 365, fdStatus: 'A', fdLICDt: '2025-01-10', fdType: 'Cumulative' },
        { fdNo: 1002, fdMNo: '12345', fdAmt: 100000, fdROI: 8.0, fdDt: '2024-06-15', fdDays: 730, fdStatus: 'A', fdLICDt: '2026-06-15', fdType: 'Monthly' },
    ],
    '1001': [
        { fdNo: 1003, fdMNo: '1001', fdAmt: 75000, fdROI: 7.5, fdDt: '2024-03-20', fdDays: 365, fdStatus: 'A', fdLICDt: '2025-03-20', fdType: 'Cumulative' },
    ],
    '1002': [],
};

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { mno } = req.query;

    if (!mno) {
        return res.status(400).json({ message: 'Member Number is required' });
    }

    // Try mock data first
    if (MOCK_FDS[mno] !== undefined) {
        console.log(`[MOCK MODE] Returning FD list for ${mno}`);
        return res.status(200).json({ fds: MOCK_FDS[mno], mockMode: true });
    }

    try {
        await dbConnect();
        const fds = await FixedDeposit.find({ fdMNo: mno }).sort({ fdDt: -1 });
        return res.status(200).json({ fds });
    } catch (error) {
        console.log('[MOCK MODE] DB error, returning empty FDs');
        return res.status(200).json({ fds: [], mockMode: true });
    }
}
