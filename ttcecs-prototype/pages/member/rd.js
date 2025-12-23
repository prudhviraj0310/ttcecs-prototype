import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MemberLayout from '../../components/MemberLayout';

export default function RecurringDeposits() {
    const router = useRouter();
    const [member, setMember] = useState(null);
    const [rds, setRds] = useState([]);
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
            fetchRDs(parsedMember.MNo, token);
        } catch (e) {
            router.push('/portal');
        }
    }, []);

    const fetchRDs = async (mno, token) => {
        try {
            const res = await fetch(`/api/member/rd-list?mno=${mno}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setRds(data.rds || []);
            }
        } catch (error) {
            console.error('Failed to fetch RDs:', error);
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
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'matured':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'closed':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
            case 'defaulted':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <MemberLayout title="Recurring Deposits" member={member}>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full"></div>
                </div>
            </MemberLayout>
        );
    }

    return (
        <MemberLayout title="Recurring Deposits" member={member}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <span className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">📊</span>
                    Recurring Deposits
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    View all your recurring deposit accounts
                </p>
            </motion.div>

            {/* Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white mb-8 shadow-xl"
            >
                <div className="flex flex-wrap gap-8">
                    <div>
                        <p className="text-white/70 text-sm">Total RDs</p>
                        <p className="text-3xl font-bold">{rds.length}</p>
                    </div>
                    <div>
                        <p className="text-white/70 text-sm">Total Paid</p>
                        <p className="text-3xl font-bold">
                            {formatCurrency(rds.reduce((sum, rd) => sum + (rd.TotalPaid || 0), 0))}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/70 text-sm">Monthly Contribution</p>
                        <p className="text-3xl font-bold">
                            {formatCurrency(rds.filter(rd => rd.Status === 'Active').reduce((sum, rd) => sum + (rd.RDAmt || 0), 0))}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* RD List */}
            {rds.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Recurring Deposits Found</h3>
                    <p className="text-gray-500">Start a recurring deposit to see it here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {rds.map((rd, index) => (
                        <motion.div
                            key={rd.RDNo || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            RD No: {rd.RDNo}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(rd.Status)}`}>
                                            {rd.Status || 'Active'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {rd.Period || 0} Months Tenure
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-emerald-600">{formatCurrency(rd.RDAmt)}</p>
                                    <p className="text-sm text-gray-500">Monthly Deposit</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500">Progress</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {rd.InstallmentsPaid || 0} / {rd.Period || 0} Installments
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                                        style={{ width: `${((rd.InstallmentsPaid || 0) / (rd.Period || 1)) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Total Paid</p>
                                    <p className="font-semibold text-green-600">{formatCurrency(rd.TotalPaid)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Interest Rate</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{rd.ROI || 0}% p.a.</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Start Date</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(rd.SDate)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Maturity Date</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(rd.EDate)}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </MemberLayout>
    );
}
