// Mock data for statements
const MOCK_STATEMENTS = {
    '12345': {
        'fd-interest': [
            { date: '2024-07-15', particulars: 'FD Interest Credit - FD1001', amount: 3750 },
            { date: '2024-10-15', particulars: 'FD Interest Credit - FD1001', amount: 3750 },
            { date: '2024-09-15', particulars: 'FD Interest Credit - FD1002', amount: 6666 },
            { date: '2024-12-15', particulars: 'FD Interest Credit - FD1002', amount: 6666 },
        ],
        'rd': [
            { date: '2024-12-01', particulars: 'RD Installment - RD001', amount: 5000, type: 'credit' },
            { date: '2024-11-01', particulars: 'RD Installment - RD001', amount: 5000, type: 'credit' },
            { date: '2024-10-01', particulars: 'RD Installment - RD001', amount: 5000, type: 'credit' },
            { date: '2024-12-01', particulars: 'RD Installment - RD002', amount: 2000, type: 'credit' },
            { date: '2024-11-01', particulars: 'RD Installment - RD002', amount: 2000, type: 'credit' },
        ],
        'loan': [
            { date: '2024-12-01', particulars: 'Loan EMI - LN001', principal: 5500, interest: 3000, amount: 8500 },
            { date: '2024-11-01', particulars: 'Loan EMI - LN001', principal: 5400, interest: 3100, amount: 8500 },
            { date: '2024-10-01', particulars: 'Loan EMI - LN001', principal: 5300, interest: 3200, amount: 8500 },
        ],
    },
    '1001': {
        'fd-interest': [
            { date: '2024-06-20', particulars: 'FD Interest Credit - FD1003', amount: 4687 },
            { date: '2024-09-20', particulars: 'FD Interest Credit - FD1003', amount: 4687 },
        ],
        'rd': [
            { date: '2024-12-01', particulars: 'RD Installment - RD003', amount: 3000, type: 'credit' },
        ],
        'loan': [
            { date: '2024-12-15', particulars: 'Loan EMI - LN002', principal: 10000, interest: 5000, amount: 15000 },
        ],
    },
    '1002': {
        'fd-interest': [],
        'rd': [],
        'loan': [],
    },
};

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { mno, type, from, to, rdNo } = req.query;

    if (!mno || !type || !from || !to) {
        return res.status(400).json({ message: 'Member Number, type, from, and to dates are required' });
    }

    // Use mock data for local testing
    const memberStatements = MOCK_STATEMENTS[mno];
    if (memberStatements) {
        const items = memberStatements[type] || [];
        const fromDate = new Date(from);
        const toDate = new Date(to);

        // Filter by date range
        const filteredItems = items.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= fromDate && itemDate <= toDate;
        });

        const total = filteredItems.reduce((sum, item) => sum + (item.amount || 0), 0);

        console.log(`[MOCK MODE] Returning ${type} statement for ${mno}: ${filteredItems.length} items, total: ${total}`);

        return res.status(200).json({
            items: filteredItems,
            total: Math.round(total * 100) / 100,
            period: { from, to },
            type,
            mockMode: true,
        });
    }

    // Fallback: return empty if member not in mock data
    console.log(`[MOCK MODE] No statement data for member ${mno}`);
    return res.status(200).json({
        items: [],
        total: 0,
        period: { from, to },
        type,
        mockMode: true,
    });
}
