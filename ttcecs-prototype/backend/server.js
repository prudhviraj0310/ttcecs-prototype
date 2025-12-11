
require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Configuration
const dbConfig = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'your_password',
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'TTCECSTEST',
    options: {
        encrypt: false, // Use true if you're on Azure
        trustServerCertificate: true // Change to false for production certificates
    }
};

// Connect to Database
sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('✅ Connected to MSSQL Database');
    }
}).catch(err => {
    console.error('❌ Database Connection Failed! Bad Config: ', err);
});

// --- API Endpoints ---

// 1. Login / Verify Member
app.post('/api/login', async (req, res) => {
    const { memberId, mobileNo } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        // Using parameterized queries to prevent SQL Injection
        const result = await pool.request()
            .input('mno', sql.VarChar, memberId)
            .input('mobile', sql.VarChar, mobileNo)
            .query(`
                SELECT TOP 1 MNo, Name, Mobile_No, Address 
                FROM MMB_mas_Members 
                WHERE CAST(MNo as VarChar) = @mno AND Mobile_No = @mobile
            `);

        if (result.recordset.length > 0) {
            res.json({ success: true, member: result.recordset[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid Member No or Mobile No' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. Get Member Details (FDs, Loans, Profile)
app.get('/api/member/:mno', async (req, res) => {
    const { mno } = req.params;
    try {
        const pool = await sql.connect(dbConfig);

        // Fetch Profile
        const profileReq = pool.request().input('mno', sql.VarChar, mno).query(`
            SELECT MNo, Name, Gender, DOB, Mobile_No, Address, Aadhar_No 
            FROM MMB_mas_Members WHERE CAST(MNo as VarChar) = @mno
        `);

        // Fetch Fixed Deposits
        const fdReq = pool.request().input('mno', sql.VarChar, mno).query(`
            SELECT fdNo, fdAmt, fdROI, fdDt, fdLICDt, fdStatus 
            FROM mmb_mas_FixedDeposit 
            WHERE fdMNo = @mno AND fdStatus = 'L'
        `);

        // Fetch Loans
        const loanReq = pool.request().input('mno', sql.VarChar, mno).query(`
            SELECT LNo, LType, LAmt, LBal, LDt, LStatus 
            FROM LoanDetails 
            WHERE LMNo = @mno AND LBal > 0
        `);

        // Execute all queries
        const [profile, fds, loans] = await Promise.all([profileReq, fdReq, loanReq]);

        if (profile.recordset.length === 0) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.json({
            profile: profile.recordset[0],
            fds: fds.recordset,
            loans: loans.recordset,
            // You can add transactions here if you have a clear mapping
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
