import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MemberLayout from '../../components/MemberLayout';

export default function Loans() {
    const router = useRouter();
    const [member, setMember] = useState(null);
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('memberToken');
        const memberData = localStorage.getItem('memberData');

        if (!token || !memberData) {
            router.push('/portal');
            return;
        }

        try {
            const parsedMember = JSON.parse(memberData);
            setMember(parsedMember);
            fetchLoans(parsedMember.MNo, token);
        } catch (e) {
            router.push('/portal');
        }
    }, []);

    const fetchLoans = async (mno, token) => {
        try {
            const res = await fetch(`/api/member/loan-list?mno=${mno}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setLoans(data.loans || []);
            }
        } catch (error) {
            console.error('Failed to fetch loans:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'closed':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'defaulted':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <MemberLayout title="Loans" member={member}>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full"></div>
                </div>
            </MemberLayout>
        );
    }

    const totalOutstanding = loans.reduce((sum, loan) => sum + (loan.LBal || 0), 0);
    const activeLoans = loans.filter(loan => loan.LStatus === 'Active');

    return (
        <MemberLayout title="Loans" member={member}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <span className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl">📉</span>
                    Loans
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    View all your loan accounts and outstanding balances
                </p>
            </motion.div>

            {/* Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white mb-8 shadow-xl"
            >
                <div className="flex flex-wrap gap-8">
                    <div>
                        <p className="text-white/70 text-sm">Total Loans</p>
                        <p className="text-3xl font-bold">{loans.length}</p>
                    </div>
                    <div>
                        <p className="text-white/70 text-sm">Outstanding Balance</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalOutstanding)}</p>
                    </div>
                    <div>
                        <p className="text-white/70 text-sm">Active Loans</p>
                        <p className="text-3xl font-bold">{activeLoans.length}</p>
                    </div>
                </div>
            </motion.div>

            {/* Loan List */}
            {loans.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Active Loans</h3>
                    <p className="text-gray-500">You have no loans at the moment</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {loans.map((loan, index) => (
                        <motion.div
                            key={loan.LNo || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {loan.LType || 'Loan'}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(loan.LStatus)}`}>
                                            {loan.LStatus || 'Active'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">Loan No: {loan.LNo}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-rose-600">{formatCurrency(loan.LBal)}</p>
                                    <p className="text-sm text-gray-500">Payable Amount</p>
                                </div>
                            </div>

                            {/* Repayment Progress */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500">Repayment Progress</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {formatCurrency((loan.LAmt || 0) - (loan.LBal || 0))} Paid
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                                        style={{ width: `${(((loan.LAmt || 0) - (loan.LBal || 0)) / (loan.LAmt || 1)) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Loan Amount</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(loan.LAmt)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Interest Rate</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{loan.LROI || 0}% p.a.</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Disbursed On</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(loan.LDt)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">EMI Amount</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(loan.EMI)}</p>
                                </div>
                                <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-3 -m-1">
                                    <p className="text-xs text-rose-600 dark:text-rose-400 uppercase tracking-wide font-bold">📅 Next EMI Due</p>
                                    <p className="font-bold text-rose-700 dark:text-rose-300">{formatDate(loan.NextDueDate)}</p>
                                    {loan.NextDueDate && (
                                        <p className="text-xs text-rose-500 mt-1">
                                            {(() => {
                                                const daysUntil = Math.ceil((new Date(loan.NextDueDate) - new Date()) / (1000 * 60 * 60 * 24));
                                                if (daysUntil < 0) return `🔴 Overdue by ${Math.abs(daysUntil)} days`;
                                                if (daysUntil === 0) return '🔴 Due Today!';
                                                if (daysUntil <= 7) return `⚠️ Due in ${daysUntil} days`;
                                                return `${daysUntil} days left`;
                                            })()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </MemberLayout>
    );
}
