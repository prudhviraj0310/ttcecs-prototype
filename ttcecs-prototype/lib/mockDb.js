
// Mock Database simulating the structure from script.sql

const mockDb = {
    // Table: MMB_mas_Members
    MMB_mas_Members: [
        {
            MNo: '12345', // Kept as string for JS compatibility, but is INT in DB
            Name: 'Prudhvi Naik',
            Mobile_No: '8019642185', // Renamed from Mobile
            Address: 'Hyderabad',
            DOA: '2023-01-15',
            Gender: 'Male', // Renamed from Sex
            DOB: '1990-05-20',
            // Status: 'Active', // Removed as it doesn't exist in real DB
            Photo: '/assets/placeholder-user.png'
        }
    ],

    // Table: mmb_mas_FixedDeposit (Renamed from FD)
    mmb_mas_FixedDeposit: [
        {
            fdNo: 1001, // INT IDENTITY
            fdMNo: '12345',
            fdAmt: 50000, // Renamed from Amount
            fdROI: 7.5, // Renamed from ROI
            fdDt: '2024-01-01', // Renamed from Date
            fdDays: 365,
            fdStatus: 'A'
            // FDI and MaturityDate removed as they are not in schema (likely calculated)
        },
        {
            fdNo: 1002,
            fdMNo: '12345',
            fdAmt: 100000,
            fdROI: 8.0,
            fdDt: '2023-06-15',
            fdDays: 365,
            fdStatus: 'A'
        }
    ],

    // Table: MMB_DayBook
    MMB_DayBook: [
        {
            dbTranDt: '2024-02-10',
            dbEDPNo: '12345',
            dbParticular: 'Cash Deposit',
            dbAmt: 5000,
            dbHead: 'Savings',
            dbModeOfPay: 'Cash',
            dbChqNo: '',
            dbPayRec: 'Rec',
            dbRtNo: 0
        },
        {
            dbTranDt: '2024-02-15',
            dbEDPNo: '12345',
            dbParticular: 'Interest Credit - FD1001',
            dbAmt: 312.50,
            dbHead: 'FD Interest',
            dbModeOfPay: 'Transfer',
            dbChqNo: '',
            dbPayRec: 'Rec',
            dbRtNo: 0
        },
        {
            dbTranDt: '2024-03-01',
            dbEDPNo: '12345',
            dbParticular: 'Withdrawal',
            dbAmt: 2000,
            dbHead: 'Savings',
            dbModeOfPay: 'Cash',
            dbChqNo: '',
            dbPayRec: 'Pay',
            dbRtNo: 0
        }
    ]
};

export default mockDb;
