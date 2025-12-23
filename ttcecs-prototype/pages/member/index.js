import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MemberLayout from '../../components/MemberLayout';
import Link from 'next/link';

export default function MemberDashboard() {
    const router = useRouter();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalFD: 0,
        totalRD: 0,
        totalLoan: 0,
        fdCount: 0,
        rdCount: 0,
        loanCount: 0,
    });

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('memberToken');
        const memberData = localStorage.getItem('memberData');

        if (!token || !memberData) {
            router.push('/portal');
            return;
        }

        try {
            setMember(JSON.parse(memberData));
            fetchDashboardData(JSON.parse(memberData).MNo, token);
        } catch (e) {
            router.push('/portal');
        }
    }, []);

    const fetchDashboardData = async (mno, token) => {
        try {
            const res = await fetch(`/api/member/dashboard-summary?mno=${mno}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setStats(data.stats || stats);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
    };

    const statsCards = [
        {
            title: 'Total Fixed Deposits',
            value: formatCurrency(stats.totalFD),
            count: `${stats.fdCount} Active`,
            icon: '💰',
            color: 'from-purple-500 to-indigo-600',
            href: '/member/fd'
        },
        {
            title: 'Total Recurring Deposits',
            value: formatCurrency(stats.totalRD),
            count: `${stats.rdCount} Active`,
            icon: '📊',
            color: 'from-emerald-500 to-teal-600',
            href: '/member/rd'
        },
        {
            title: 'Active Loans',
            value: formatCurrency(stats.totalLoan),
            count: `${stats.loanCount} Active`,
            icon: '📉',
            color: 'from-rose-500 to-pink-600',
            href: '/member/loan'
        },
    ];

    if (loading) {
        return (
            <MemberLayout title="Dashboard" member={member}>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full"></div>
                </div>
            </MemberLayout>
        );
    }

    return (
        <MemberLayout title="Dashboard" member={member}>
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back, {member?.Name?.split(' ')[0]}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Here's an overview of your financial accounts
                </p>
            </motion.div>

            {/* Member Details Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8"
            >
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">👤</span>
                    Member Details
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Member Number</p>
                        <p className="font-bold text-gray-900 dark:text-white">{member?.MNo}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
                        <p className="font-bold text-gray-900 dark:text-white">{member?.Name}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Registered Mobile</p>
                        <p className="font-bold text-gray-900 dark:text-white">{member?.Mobile_No}</p>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {statsCards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        <Link href={card.href}>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                                        {card.icon}
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                        {card.count}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* New Investment CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-brand-teal to-blue-600 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Start a New Investment</h2>
                            <p className="text-white/80">
                                Open a new Fixed Deposit or Recurring Deposit with attractive interest rates
                            </p>
                        </div>
                        <Link href="/member/new-investment">
                            <button className="px-8 py-4 bg-white text-brand-teal font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 whitespace-nowrap">
                                <span className="text-xl">➕</span>
                                Make Investment
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 grid md:grid-cols-2 gap-4"
            >
                <Link href="/member/statement">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-2xl">
                            📄
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">Generate Statement</p>
                            <p className="text-sm text-gray-500">Interest certificates & account statements</p>
                        </div>
                    </div>
                </Link>
                <a href="tel:+914144277277">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-2xl">
                            📞
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">Contact Support</p>
                            <p className="text-sm text-gray-500">Call us for any assistance</p>
                        </div>
                    </div>
                </a>
            </motion.div>
        </MemberLayout>
    );
}
