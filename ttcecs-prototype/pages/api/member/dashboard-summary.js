import dbConnect from '../../../lib/dbConnect';
import FixedDeposit from '../../../models/FixedDeposit';
import RecurringDeposit from '../../../models/RecurringDeposit';
import Loan from '../../../models/Loan';

// Mock data for local testing
const MOCK_DATA = {
    '12345': {
        stats: { totalFD: 150000, totalRD: 60000, totalLoan: 125000, fdCount: 2, rdCount: 2, loanCount: 1 },
        alerts: [
            { type: 'fd-maturity', message: 'FD 1001 matures in 18 days', severity: 'medium' },
            { type: 'loan-due', message: 'Loan EMI due on 1st January', severity: 'medium' },
        ],
    },
    '1001': {
        stats: { totalFD: 75000, totalRD: 72000, totalLoan: 350000, fdCount: 1, rdCount: 1, loanCount: 1 },
        alerts: [{ type: 'rd-overdue', message: 'RD installment overdue by 3 days', severity: 'high' }],
    },
    '1002': {
        stats: { totalFD: 0, totalRD: 0, totalLoan: 0, fdCount: 0, rdCount: 0, loanCount: 0 },
        alerts: [],
    },
};

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { mno } = req.query;

    if (!mno) {
        return res.status(400).json({ message: 'Member Number is required' });
    }

    // Try mock data first (for faster local testing)
    if (MOCK_DATA[mno]) {
        console.log(`[MOCK MODE] Returning dashboard data for ${mno}`);
        return res.status(200).json({
            stats: MOCK_DATA[mno].stats,
            alerts: MOCK_DATA[mno].alerts,
            mockMode: true,
        });
    }

    try {
        await dbConnect();

        const [fds, rds, loans] = await Promise.all([
            FixedDeposit.find({ fdMNo: mno }),
            RecurringDeposit.find({ MNo: mno }),
            Loan.find({ LMNo: mno }),
        ]);

        const activeFDs = fds.filter(fd => fd.fdStatus === 'A' || fd.fdStatus === 'Active');
        const activeRDs = rds.filter(rd => rd.Status === 'Active');
        const activeLoans = loans.filter(loan => loan.LStatus === 'Active');

        const stats = {
            totalFD: activeFDs.reduce((sum, fd) => sum + (fd.fdAmt || 0), 0),
            totalRD: activeRDs.reduce((sum, rd) => sum + (rd.TotalPaid || 0), 0),
            totalLoan: activeLoans.reduce((sum, loan) => sum + (loan.LBal || 0), 0),
            fdCount: activeFDs.length,
            rdCount: activeRDs.length,
            loanCount: activeLoans.length,
        };

        return res.status(200).json({ stats, alerts: [] });
    } catch (error) {
        // Fallback to empty data
        console.log('[MOCK MODE] DB error, returning empty stats');
        return res.status(200).json({
            stats: { totalFD: 0, totalRD: 0, totalLoan: 0, fdCount: 0, rdCount: 0, loanCount: 0 },
            alerts: [],
            mockMode: true,
        });
    }
}
