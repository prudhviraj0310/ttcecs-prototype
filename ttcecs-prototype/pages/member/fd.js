import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MemberLayout from '../../components/MemberLayout';

export default function FixedDeposits() {
    const router = useRouter();
    const [member, setMember] = useState(null);
    const [fds, setFds] = useState([]);
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
            fetchFDs(parsedMember.MNo, token);
        } catch (e) {
            router.push('/portal');
        }
    }, []);

    const fetchFDs = async (mno, token) => {
        try {
            const res = await fetch(`/api/member/fd-list?mno=${mno}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setFds(data.fds || []);
            }
        } catch (error) {
            console.error('Failed to fetch FDs:', error);
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
            case 'a':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'matured':
            case 'm':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'closed':
            case 'c':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status) => {
        switch (status?.toLowerCase()) {
            case 'a': return 'Active';
            case 'm': return 'Matured';
            case 'c': return 'Closed';
            default: return status || 'Unknown';
        }
    };

    if (loading) {
        return (
            <MemberLayout title="Fixed Deposits" member={member}>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full"></div>
                </div>
            </MemberLayout>
        );
    }

    return (
        <MemberLayout title="Fixed Deposits" member={member}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <span className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">💰</span>
                    Fixed Deposits
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    View all your fixed deposit accounts
                </p>
            </motion.div>

            {/* Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white mb-8 shadow-xl"
            >
                <div className="flex flex-wrap gap-8">
                    <div>
                        <p className="text-white/70 text-sm">Total Deposits</p>
                        <p className="text-3xl font-bold">{fds.length}</p>
                    </div>
                    <div>
                        <p className="text-white/70 text-sm">Total Amount</p>
                        <p className="text-3xl font-bold">
                            {formatCurrency(fds.reduce((sum, fd) => sum + (fd.fdAmt || 0), 0))}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/70 text-sm">Active</p>
                        <p className="text-3xl font-bold">
                            {fds.filter(fd => fd.fdStatus?.toLowerCase() === 'a' || fd.fdStatus?.toLowerCase() === 'active').length}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* FD List */}
            {fds.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Fixed Deposits Found</h3>
                    <p className="text-gray-500">Start investing in fixed deposits to see them here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {fds.map((fd, index) => (
                        <motion.div
                            key={fd.fdNo || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            FD No: {fd.fdNo}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(fd.fdStatus)}`}>
                                            {getStatusLabel(fd.fdStatus)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {fd.fdType === 'Monthly' ? '📅 Monthly Interest' : '📈 Cumulative'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-brand-teal">{formatCurrency(fd.fdAmt)}</p>
                                    <p className="text-sm text-gray-500">Principal Amount</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Interest Rate</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{fd.fdROI || 0}% p.a.</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Tenure</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{fd.fdDays || 0} Days</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Start Date</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(fd.fdDt)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Maturity Date</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(fd.fdLICDt)}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </MemberLayout>
    );
}
