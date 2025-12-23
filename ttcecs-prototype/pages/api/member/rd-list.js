import dbConnect from '../../../lib/dbConnect';
import RecurringDeposit from '../../../models/RecurringDeposit';

// Mock RD data for local testing
const MOCK_RDS = {
    '12345': [
        {
            RDNo: 'RD001',
            MNo: '12345',
            RDAmt: 5000,
            ROI: 6.5,
            Period: 24,
            SDate: '2024-01-01',
            EDate: '2026-01-01',
            TotalPaid: 60000,
            InstallmentsPaid: 12,
            Status: 'Active',
            DueDay: 1  // Installment due on 1st of every month
        },
        {
            RDNo: 'RD002',
            MNo: '12345',
            RDAmt: 2000,
            ROI: 6.0,
            Period: 12,
            SDate: '2024-06-01',
            EDate: '2025-06-01',
            TotalPaid: 14000,
            InstallmentsPaid: 7,
            Status: 'Active',
            DueDay: 1  // Installment due on 1st of every month
        },
    ],
    '1001': [
        {
            RDNo: 'RD003',
            MNo: '1001',
            RDAmt: 3000,
            ROI: 6.5,
            Period: 36,
            SDate: '2023-01-01',
            EDate: '2026-01-01',
            TotalPaid: 72000,
            InstallmentsPaid: 24,
            Status: 'Active',
            DueDay: 1
        },
    ],
    '1002': [],
};

// Calculate next due date helper
function calculateNextDueDate(dueDay) {
    const today = new Date();
    let nextDue = new Date(today.getFullYear(), today.getMonth(), dueDay);

    // If due date has passed this month, move to next month
    if (nextDue <= today) {
        nextDue = new Date(today.getFullYear(), today.getMonth() + 1, dueDay);
    }

    return nextDue.toISOString().split('T')[0];
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { mno } = req.query;

    if (!mno) {
        return res.status(400).json({ message: 'Member Number is required' });
    }

    // Try mock data first
    if (MOCK_RDS[mno] !== undefined) {
        console.log(`[MOCK MODE] Returning RD list for ${mno}`);

        // Calculate dynamic next due dates
        const rdsWithDueDates = MOCK_RDS[mno].map(rd => ({
            ...rd,
            NextDueDate: calculateNextDueDate(rd.DueDay || 1)
        }));

        return res.status(200).json({ rds: rdsWithDueDates, mockMode: true });
    }

    try {
        await dbConnect();
        const rds = await RecurringDeposit.find({ MNo: mno }).sort({ SDate: -1 });
        return res.status(200).json({ rds });
    } catch (error) {
        console.log('[MOCK MODE] DB error, returning empty RDs');
        return res.status(200).json({ rds: [], mockMode: true });
    }
}
