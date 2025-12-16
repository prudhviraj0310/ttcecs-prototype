
-- Dummy Data Insertion Script
-- This script inserts the mock data into the database tables to match the demo.
-- UPDATED to match Real Database Schema from script.sql

-- 1. Insert Member Profile (Prudhvi Naik)
-- Table: [dbo].[MMB_mas_Members]
SET IDENTITY_INSERT [dbo].[MMB_mas_Members] ON;

INSERT INTO [dbo].[MMB_mas_Members] (
    [MNo], [Name], [Mobile_No], [Address], [DOA], [Gender], [DOB]
) VALUES (
    12345, 
    'Prudhvi Naik', 
    '8019642185', 
    'Hyderabad', 
    '2023-01-15', 
    'M', 
    '1990-05-20'
);

SET IDENTITY_INSERT [dbo].[MMB_mas_Members] OFF;

-- 2. Insert Fixed Deposits
-- Table: [dbo].[mmb_mas_FixedDeposit] (Real table for FDs)
-- Note: fdNo is Identity(1,1), so we force insert IDs 1001, 1002.
SET IDENTITY_INSERT [dbo].[mmb_mas_FixedDeposit] ON;

INSERT INTO [dbo].[mmb_mas_FixedDeposit] (
    [fdNo], [fdMNo], [fdAmt], [fdROI], [fdDt], [fdDays], [fdStatus]
) VALUES 
(
    1001, 
    '12345', 
    50000, 
    7.5, 
    '2024-01-01', 
    365, 
    'A'
),
(
    1002, 
    '12345', 
    100000, 
    8.0, 
    '2023-06-15', 
    365, 
    'A'
);

SET IDENTITY_INSERT [dbo].[mmb_mas_FixedDeposit] OFF;

-- 3. Insert Recent Transactions
-- Table: [dbo].[MMB_DayBook]
-- Added required columns: dbChqNo, dbPayRec, dbRtNo
INSERT INTO [dbo].[MMB_DayBook] (
    [dbTranDt], [dbEDPNo], [dbParticular], [dbAmt], [dbHead], [dbModeOfPay],
    [dbChqNo], [dbPayRec], [dbRtNo]
) VALUES 
(
    '2024-02-10', '12345', 'Cash Deposit', 5000, 'Savings', 'Cash',
    '', 'Rec', 0
),
(
    '2024-02-15', '12345', 'Interest Credit - FD1001', 312.50, 'FD Interest', 'Transfer',
    '', 'Rec', 0
),
(
    '2024-03-01', '12345', 'Withdrawal', 2000, 'Savings', 'Cash',
    '', 'Pay', 0
);

-- Verify Data
SELECT * FROM [dbo].[MMB_mas_Members] WHERE [Mobile_No] = '8019642185';
