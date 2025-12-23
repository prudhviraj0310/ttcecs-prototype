import dbConnect from '../../lib/dbConnect';
import Member from '../../models/Member';
import FixedDeposit from '../../models/FixedDeposit';
import RecurringDeposit from '../../models/RecurringDeposit';
import Loan from '../../models/Loan';

// Dummy data for testing
const DUMMY_MEMBERS = [
    {
        MNo: '12345',
        Name: 'Prudhvi Naik',
        Mobile_No: '8019642185',
        Address: 'Hyderabad, Telangana',
        Gender: 'M',
        DOB: new Date('1990-05-20'),
        DOA: new Date('2020-01-15'),
    },
    {
        MNo: '1001',
        Name: 'Rajesh Kumar',
        Mobile_No: '9876543210',
        Address: '123, Anna Nagar, Chennai',
        Gender: 'M',
        DOB: new Date('1985-08-15'),
        DOA: new Date('2018-06-10'),
    },
    {
        MNo: '1002',
        Name: 'Priya Sundar',
        Mobile_No: '9898989898',
        Address: '45, T Nagar, Chennai',
        Gender: 'F',
        DOB: new Date('1992-03-25'),
        DOA: new Date('2019-03-20'),
    },
];

const DUMMY_FDS = [
    { fdNo: 1001, fdMNo: '12345', fdAmt: 50000, fdROI: 7.5, fdDt: new Date('2024-01-10'), fdDays: 365, fdStatus: 'A', fdLICDt: new Date('2025-01-10') },
    { fdNo: 1002, fdMNo: '12345', fdAmt: 100000, fdROI: 8.0, fdDt: new Date('2024-06-15'), fdDays: 730, fdStatus: 'A', fdLICDt: new Date('2026-06-15') },
    { fdNo: 1003, fdMNo: '1001', fdAmt: 75000, fdROI: 7.5, fdDt: new Date('2024-03-20'), fdDays: 365, fdStatus: 'A', fdLICDt: new Date('2025-03-20') },
];

const DUMMY_RDS = [
    { RDNo: 'RD001', MNo: '12345', RDAmt: 5000, ROI: 6.5, Period: 24, SDate: new Date('2024-01-01'), EDate: new Date('2026-01-01'), TotalPaid: 60000, InstallmentsPaid: 12, Status: 'Active' },
    { RDNo: 'RD002', MNo: '12345', RDAmt: 2000, ROI: 6.0, Period: 12, SDate: new Date('2024-06-01'), EDate: new Date('2025-06-01'), TotalPaid: 14000, InstallmentsPaid: 7, Status: 'Active' },
    { RDNo: 'RD003', MNo: '1001', RDAmt: 3000, ROI: 6.5, Period: 36, SDate: new Date('2023-01-01'), EDate: new Date('2026-01-01'), TotalPaid: 72000, InstallmentsPaid: 24, Status: 'Active' },
];

const DUMMY_LOANS = [
    { LNo: 'LN001', LMNo: '12345', LType: 'Personal Loan', LAmt: 200000, LBal: 125000, LROI: 10.5, LDt: new Date('2023-06-01'), LStatus: 'Active', EMI: 8500, Tenure: 24 },
    { LNo: 'LN002', LMNo: '1001', LType: 'Vehicle Loan', LAmt: 500000, LBal: 350000, LROI: 9.5, LDt: new Date('2023-01-15'), LStatus: 'Active', EMI: 15000, Tenure: 36 },
];

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Use POST to seed data' });
    }

    try {
        await dbConnect();

        // Clear existing data
        await Promise.all([
            Member.deleteMany({}),
            FixedDeposit.deleteMany({}),
            RecurringDeposit.deleteMany({}),
            Loan.deleteMany({}),
        ]);

        // Insert dummy data
        await Promise.all([
            Member.insertMany(DUMMY_MEMBERS),
            FixedDeposit.insertMany(DUMMY_FDS),
            RecurringDeposit.insertMany(DUMMY_RDS),
            Loan.insertMany(DUMMY_LOANS),
        ]);

        console.log('✅ Dummy data seeded successfully!');

        return res.status(200).json({
            message: 'Dummy data seeded successfully!',
            data: {
                members: DUMMY_MEMBERS.length,
                fds: DUMMY_FDS.length,
                rds: DUMMY_RDS.length,
                loans: DUMMY_LOANS.length,
            },
            testAccounts: [
                { MNo: '12345', Mobile: '8019642185', Name: 'Prudhvi Naik' },
                { MNo: '1001', Mobile: '9876543210', Name: 'Rajesh Kumar' },
                { MNo: '1002', Mobile: '9898989898', Name: 'Priya Sundar' },
            ],
        });
    } catch (error) {
        console.error('Seed error:', error);
        return res.status(500).json({ message: 'Failed to seed data', error: error.message });
    }
}
