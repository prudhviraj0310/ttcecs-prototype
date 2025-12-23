import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
    { name: 'Dashboard', href: '/member', icon: '🏠' },
    { name: 'Fixed Deposits', href: '/member/fd', icon: '💰' },
    { name: 'Recurring Deposits', href: '/member/rd', icon: '📊' },
    { name: 'Loans', href: '/member/loan', icon: '📉' },
    { name: 'Statements', href: '/member/statement', icon: '📄' },
    { name: 'New Investment', href: '/member/new-investment', icon: '➕' },
];

export default function MemberLayout({ children, title = 'Member Portal', member }) {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('memberToken');
        localStorage.removeItem('memberData');
        router.push('/portal');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Head>
                <title>{title} | TTCECS</title>
            </Head>

            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {sidebarOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl z-40
                transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo/Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-teal to-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                            T
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 dark:text-white">TTCECS</h1>
                            <p className="text-xs text-gray-500">Member Portal</p>
                        </div>
                    </div>
                </div>

                {/* Member Info */}
                {member && (
                    <div className="p-4 m-4 bg-gradient-to-br from-brand-teal/10 to-blue-500/10 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-teal to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                                {member.Name?.charAt(0) || 'M'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 dark:text-white truncate">{member.Name}</p>
                                <p className="text-xs text-gray-500">MNo: {member.MNo}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = router.pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
                                        ${isActive
                                            ? 'bg-gradient-to-r from-brand-teal to-blue-500 text-white shadow-lg'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }
                                    `}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 min-h-screen p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
