import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data based on SQL Schema
const MOCK_DB = {
    members: [
        {
            MNo: '1001',
            Name: 'Rajesh Kumar',
            Gender: 'M',
            DOB: '1985-05-20',
            Mobile_No: '9876543210',
            Address: '123, Anna Nagar, Chennai - 600040',
            Pan_No: 'ABCDE1234F',
            Aadhar_No: '1234 5678 9012',
            DOA: '2015-06-15' // Date of Admission
        },
        {
            MNo: '1002',
            Name: 'Priya Sundar',
            Gender: 'F',
            DOB: '1990-08-12',
            Mobile_No: '9898989898',
            Address: '45, T Nagar, Chennai - 600017',
            Pan_No: 'FGHIJ5678K',
            Aadhar_No: '9876 5432 1098',
            DOA: '2018-01-20'
        }
    ],
    fixedDeposits: [
        { fdNo: 'FD001', fdMNo: '1001', fdAmt: 50000, fdROI: 7.5, fdDt: '2023-01-10', fdLICDt: '2024-01-10', fdStatus: 'Active' },
        { fdNo: 'FD002', fdMNo: '1001', fdAmt: 100000, fdROI: 8.0, fdDt: '2023-06-15', fdLICDt: '2025-06-15', fdStatus: 'Active' },
        { fdNo: 'FD003', fdMNo: '1002', fdAmt: 75000, fdROI: 7.5, fdDt: '2023-03-20', fdLICDt: '2024-03-20', fdStatus: 'Active' }
    ],
    recurringDeposits: [
        { RDNo: 'RD001', MNo: '1001', RDAmt: '5000', ROI: 6.5, Period: 12, SDate: '2024-01-01', EDate: '2025-01-01', ACNo: 'RD-ACC-01' }
    ],
    loans: [
        { LNo: 'LN001', LMNo: '1001', LType: 'Personal Loan', LAmt: 200000, LBal: 150000, LROI: 10.5, LDt: '2023-02-01', LStatus: 'Active' }
    ],
    transactions: [
        { dbTranDt: '2024-12-01', dbEDPNo: '1001', dbParticular: 'FD Interest Credit', dbAmt: 3125, dbPayRec: 'Receipt', dbModeOfPay: 'Bank' },
        { dbTranDt: '2024-11-05', dbEDPNo: '1001', dbParticular: 'Loan Repayment - LN001', dbAmt: 5000, dbPayRec: 'Payment', dbModeOfPay: 'Cash' },
    ]
};

export default function MemberCheck() {
    const [memberId, setMemberId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [memberData, setMemberData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate API call delay
        setTimeout(() => {
            const member = MOCK_DB.members.find(m => m.MNo === memberId && m.Mobile_No === mobileNo);

            if (member) {
                setMemberData({
                    profile: member,
                    fds: MOCK_DB.fixedDeposits.filter(fd => fd.fdMNo === member.MNo),
                    rds: MOCK_DB.recurringDeposits.filter(rd => rd.MNo === member.MNo),
                    loans: MOCK_DB.loans.filter(l => l.LMNo === member.MNo),
                    transactions: MOCK_DB.transactions.filter(t => t.dbEDPNo === member.MNo)
                });
                setIsLoggedIn(true);
            } else {
                setError('Invalid Member Number or Mobile Number. Please try again (Try MNo: 1001, Mobile: 9876543210).');
            }
            setLoading(false);
        }, 1000);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            <Head>
                <title>Member Portal | THECOS</title>
            </Head>
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-blue-600 mb-4">
                            Member Services Portal
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Securely access your account details, deposits, and loan status.
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {!isLoggedIn ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
                            >
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                                        🔐
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Member Login</h2>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Member Number (MNo)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-brand-teal focus:border-transparent bg-gray-50 dark:bg-gray-900 dark:text-white transition-all"
                                            placeholder="e.g., 1001"
                                            value={memberId}
                                            onChange={(e) => setMemberId(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Registered Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-brand-teal focus:border-transparent bg-gray-50 dark:bg-gray-900 dark:text-white transition-all"
                                            placeholder="e.g., 9876543210"
                                            value={mobileNo}
                                            onChange={(e) => setMobileNo(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-gradient-to-r from-brand-teal to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Verifying...
                                            </>
                                        ) : 'Access Dashboard'}
                                    </button>

                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Demo Credentials: MNo: 1001, Mobile: 9876543210</p>
                                    </div>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* 1. Profile Header */}
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                                        <div className="w-24 h-24 bg-gradient-to-br from-brand-teal to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                            {memberData.profile.Name.charAt(0)}
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{memberData.profile.Name}</h2>
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide inline-block mx-auto md:mx-0">Active Member</span>
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-400 mb-4 flex flex-col md:flex-row gap-4 items-center md:items-start">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                                                    MNo: {memberData.profile.MNo}
                                                </span>
                                                <span className="hidden md:inline">•</span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                    {memberData.profile.Mobile_No}
                                                </span>
                                            </p>

                                            <button onClick={() => setIsLoggedIn(false)} className="text-sm text-red-500 hover:text-red-700 underline underline-offset-4">
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Dashboard Grid */}
                                <div className="grid md:grid-cols-2 gap-6">

                                    {/* Fixed Deposits Card */}
                                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                <span className="p-2 bg-purple-100 text-purple-600 rounded-lg">💰</span>
                                                Fixed Deposits
                                            </h3>
                                            <span className="text-sm font-bold text-gray-500">{memberData.fds.length} Active</span>
                                        </div>

                                        {memberData.fds.length > 0 ? (
                                            <div className="space-y-4">
                                                {memberData.fds.map((fd, idx) => (
                                                    <div key={idx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 transition-colors">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <div className="font-bold text-gray-900 dark:text-white">{fd.fdNo}</div>
                                                                <div className="text-xs text-gray-500">Matures: {fd.fdLICDt}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-bold text-brand-teal">{formatCurrency(fd.fdAmt)}</div>
                                                                <div className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full inline-block mt-1">{fd.fdROI}% ROI</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">No active fixed deposits found.</div>
                                        )}
                                    </div>

                                    {/* Loans Card */}
                                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                <span className="p-2 bg-rose-100 text-rose-600 rounded-lg">📉</span>
                                                Active Loans
                                            </h3>
                                            <span className="text-sm font-bold text-gray-500">{memberData.loans.length} Active</span>
                                        </div>

                                        {memberData.loans.length > 0 ? (
                                            <div className="space-y-4">
                                                {memberData.loans.map((loan, idx) => (
                                                    <div key={idx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <div className="font-bold text-gray-900 dark:text-white">{loan.LType}</div>
                                                                <div className="text-xs text-gray-500">{loan.LNo} • Issued: {loan.LDt}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-bold text-rose-500">{formatCurrency(loan.LBal)}</div>
                                                                <div className="text-xs text-gray-500">Balance</div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                                            <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${(loan.LBal / loan.LAmt) * 100}%` }}></div>
                                                        </div>
                                                        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                                                            <span>Paid: {formatCurrency(loan.LAmt - loan.LBal)}</span>
                                                            <span>Total: {formatCurrency(loan.LAmt)}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">No active loans found.</div>
                                        )}
                                    </div>

                                </div>

                                {/* 3. Transaction History */}
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                                        <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">🧾</span>
                                        Recent Transactions
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                <tr>
                                                    <th className="p-4 rounded-l-xl font-semibold text-gray-600 dark:text-gray-300">Date</th>
                                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Description</th>
                                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Type</th>
                                                    <th className="p-4 rounded-r-xl text-right font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                                {memberData.transactions.map((tx, idx) => (
                                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                        <td className="p-4 text-gray-500">{tx.dbTranDt}</td>
                                                        <td className="p-4 font-medium text-gray-900 dark:text-white">{tx.dbParticular}</td>
                                                        <td className="p-4">
                                                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${tx.dbPayRec === 'Receipt'
                                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                                }`}>
                                                                {tx.dbPayRec}
                                                            </span>
                                                        </td>
                                                        <td className={`p-4 text-right font-bold ${tx.dbPayRec === 'Receipt' ? 'text-green-600' : 'text-gray-900 dark:text-white'
                                                            }`}>
                                                            {tx.dbPayRec === 'Receipt' ? '+' : '-'}{formatCurrency(tx.dbAmt)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {memberData.transactions.length === 0 && (
                                            <div className="text-center py-8 text-gray-500">No recent transactions.</div>
                                        )}
                                    </div>
                                </div>

                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </main>
            <Footer />
        </div>
    );
}
