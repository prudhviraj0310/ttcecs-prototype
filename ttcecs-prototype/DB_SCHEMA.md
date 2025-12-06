# Database Schema & Structure

This document outlines the proposed database schema for the THECOS application, designed to handle members, deposits, loans, and transactions.

## 1. Users / Members Table (`members`)

Stores all information related to society members.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID / INT | PK, Auto-increment | Unique Member ID |
| `employee_id` | VARCHAR(20) | Unique, Not Null | SETC Employee ID |
| `full_name` | VARCHAR(100) | Not Null | Member's Full Name |
| `email` | VARCHAR(100) | Unique | Email Address |
| `phone_number` | VARCHAR(15) | Unique, Not Null | Contact Number |
| `password_hash` | VARCHAR(255) | Not Null | Hashed Password |
| `dob` | DATE | | Date of Birth |
| `address` | TEXT | | Residential Address |
| `membership_type` | ENUM | Default 'Regular' | 'Regular', 'Associate', 'Nominee' |
| `status` | ENUM | Default 'Active' | 'Active', 'Inactive', 'Suspended' |
| `join_date` | TIMESTAMP | Default CURRENT_TIMESTAMP | Date of Joining |
| `profile_image_url` | VARCHAR(255) | | URL to profile picture |

## 2. Nominees Table (`nominees`)

Stores nominee details for members.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID / INT | PK, Auto-increment | Unique ID |
| `member_id` | UUID / INT | FK -> members.id | Linked Member |
| `name` | VARCHAR(100) | Not Null | Nominee Name |
| `relationship` | VARCHAR(50) | Not Null | Relationship to Member |
| `dob` | DATE | | Nominee DOB |
| `contact_number` | VARCHAR(15) | | Nominee Contact |

## 3. Deposit Schemes Table (`deposit_schemes`)

Configuration for available deposit schemes (RD, FD, etc.).

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(20) | PK | Scheme Code (e.g., 'RD', 'DMG') |
| `name` | VARCHAR(100) | Not Null | Scheme Name |
| `interest_rate` | DECIMAL(5,2) | Not Null | Annual Interest Rate (%) |
| `min_amount` | DECIMAL(10,2) | Not Null | Minimum Deposit Amount |
| `tenure_months_min` | INT | | Minimum Tenure in Months |
| `tenure_months_max` | INT | | Maximum Tenure in Months |
| `description` | TEXT | | Scheme Details |
| `is_active` | BOOLEAN | Default TRUE | Is scheme currently available? |

## 4. Member Deposits Table (`member_deposits`)

Records of actual deposits made by members.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID / INT | PK, Auto-increment | Unique Deposit ID |
| `member_id` | UUID / INT | FK -> members.id | Member who owns the deposit |
| `scheme_id` | VARCHAR(20) | FK -> deposit_schemes.id | Scheme Type |
| `principal_amount` | DECIMAL(15,2) | Not Null | Amount Deposited |
| `interest_rate` | DECIMAL(5,2) | Not Null | Rate at time of deposit |
| `start_date` | DATE | Not Null | Deposit Start Date |
| `maturity_date` | DATE | Not Null | Expected Maturity Date |
| `maturity_amount` | DECIMAL(15,2) | | Expected Return Amount |
| `status` | ENUM | Default 'Active' | 'Active', 'Matured', 'Closed' |

## 5. Loans Table (`loans`)

Records of loans taken by members.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID / INT | PK, Auto-increment | Unique Loan ID |
| `member_id` | UUID / INT | FK -> members.id | Borrower |
| `loan_type` | VARCHAR(50) | Not Null | Type (Personal, Housing, etc.) |
| `amount_sanctioned` | DECIMAL(15,2) | Not Null | Total Loan Amount |
| `interest_rate` | DECIMAL(5,2) | Not Null | Interest Rate (%) |
| `emi_amount` | DECIMAL(10,2) | Not Null | Monthly Installment |
| `start_date` | DATE | Not Null | Loan Start Date |
| `end_date` | DATE | | Expected End Date |
| `outstanding_balance` | DECIMAL(15,2) | Not Null | Current Balance to Pay |
| `status` | ENUM | Default 'Active' | 'Active', 'Closed', 'Defaulted' |

## 6. Transactions Table (`transactions`)

Ledger of all financial transactions.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID / INT | PK, Auto-increment | Unique Transaction ID |
| `member_id` | UUID / INT | FK -> members.id | Related Member |
| `type` | ENUM | Not Null | 'Deposit', 'Withdrawal', 'Loan_Repayment', 'Interest_Credit' |
| `amount` | DECIMAL(15,2) | Not Null | Transaction Amount |
| `reference_id` | VARCHAR(50) | | External Ref / Bank Ref |
| `description` | TEXT | | Transaction Details |
| `transaction_date` | TIMESTAMP | Default CURRENT_TIMESTAMP | Date & Time |
| `status` | ENUM | Default 'Success' | 'Success', 'Pending', 'Failed' |

## Relationships Overview

*   **One Member** can have **Multiple Nominees**.
*   **One Member** can have **Multiple Deposits**.
*   **One Member** can have **Multiple Loans**.
*   **One Member** can have **Multiple Transactions**.
*   **Deposits** are linked to **Deposit Schemes**.
