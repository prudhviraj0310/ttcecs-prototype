import dbConnect from '../../../lib/dbConnect';
import Loan from '../../../models/Loan';

// Mock Loan data for local testing
const MOCK_LOANS = {
    '12345': [
        {
            LNo: 'LN001',
            LMNo: '12345',
            LType: 'Personal Loan',
            LAmt: 200000,
            LBal: 125000,
            LROI: 10.5,
            LDt: '2023-06-01',
            LStatus: 'Active',
            EMI: 8500,
            Tenure: 24,
            NextDueDate: '2025-01-01',
            DueDay: 1  // EMI due on 1st of every month
        },
    ],
    '1001': [
        {
            LNo: 'LN002',
            LMNo: '1001',
            LType: 'Vehicle Loan',
            LAmt: 500000,
            LBal: 350000,
            LROI: 9.5,
            LDt: '2023-01-15',
            LStatus: 'Active',
            EMI: 15000,
            Tenure: 36,
            NextDueDate: '2025-01-15',
            DueDay: 15  // EMI due on 15th of every month
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
    if (MOCK_LOANS[mno] !== undefined) {
        console.log(`[MOCK MODE] Returning Loan list for ${mno}`);

        // Calculate dynamic next due dates
        const loansWithDueDates = MOCK_LOANS[mno].map(loan => ({
            ...loan,
            NextDueDate: calculateNextDueDate(loan.DueDay || 1)
        }));

        return res.status(200).json({ loans: loansWithDueDates, mockMode: true });
    }

    try {
        await dbConnect();
        const loans = await Loan.find({ LMNo: mno }).sort({ LDt: -1 });
        return res.status(200).json({ loans });
    } catch (error) {
        console.log('[MOCK MODE] DB error, returning empty loans');
        return res.status(200).json({ loans: [], mockMode: true });
    }
}
