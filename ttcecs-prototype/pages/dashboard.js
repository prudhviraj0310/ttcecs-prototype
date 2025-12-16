
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for user in local storage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }

        const user = JSON.parse(storedUser);
        fetchDashboardData(user.Mobile_No);
    }, []);

    const fetchDashboardData = async (phoneNumber) => {
        try {
            const res = await fetch(`/api/user/dashboard-data?phoneNumber=${phoneNumber}`);
            if (res.ok) {
                const data = await res.json();
                setUserData(data);
            } else {
                // Handle error (maybe logout)
                console.error('Failed to fetch dashboard data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const calculateMaturity = (startDt, days) => {
        const date = new Date(startDt);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-primary text-xl animate-pulse">Loading Dashboard...</div>
            </div>
        );
    }

    if (!userData) {
        return null; // Or some error state
    }

    const { user, fds, transactions } = userData;

    return (
        <div className="min-h-screen flex flex-col bg-background text-text">
            <Head>
                <title>Dashboard - TTCECS</title>
            </Head>
            <Header />

            <main className="flex-grow p-4 md:p-8 container mx-auto max-w-6xl" style={{ paddingTop: '180px' }}>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Welcome, {user.Name}
                        </h1>
                        <p className="text-slate-500 mt-1">Member No: {user.MNo}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 border border-red-500/50 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {/* Profile Summary */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
                    <h2 className="text-xl font-bold mb-4 text-slate-900">Profile Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="details-item">
                            <label className="text-sm text-slate-500 block mb-1">Mobile</label>
                            <span className="font-medium text-slate-900">{user.Mobile_No}</span>
                        </div>
                        <div className="details-item">
                            <label className="text-sm text-slate-500 block mb-1">Address</label>
                            <span className="font-medium text-slate-900">{user.Address}</span>
                        </div>
                        <div className="details-item">
                            <label className="text-sm text-slate-500 block mb-1">Gender</label>
                            <span className="font-medium text-slate-900">{user.Gender}</span>
                        </div>
                        <div className="details-item">
                            <label className="text-sm text-slate-500 block mb-1">Join Date</label>
                            <span className="font-medium text-slate-900">{user.DOA}</span>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Fixed Deposits */}
                    <section className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900">Your Investments</h2>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
                                Fixed Deposits (FD)
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{fds.length}</span>
                            </h3>

                            {fds.length > 0 ? (
                                <div className="space-y-4">
                                    {fds.map((fd) => {
                                        const interestAmount = Math.round((fd.fdAmt * fd.fdROI * fd.fdDays) / 36500);
                                        const maturityDate = calculateMaturity(fd.fdDt, fd.fdDays);
                                        return (
                                            <div key={fd.fdNo} className="bg-slate-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-blue-300 transition-colors">
                                                <div>
                                                    <div className="font-bold text-lg text-slate-800">FD No: {fd.fdNo}</div>
                                                    <div className="text-sm text-slate-500">Matures on: {maturityDate}</div>
                                                </div>
                                                <div className="flex gap-4 sm:gap-8">
                                                    <div>
                                                        <div className="text-xs text-slate-500 uppercase tracking-wider">Amount</div>
                                                        <div className="font-bold text-slate-900">₹{fd.fdAmt.toLocaleString()}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-slate-500 uppercase tracking-wider">Interest Rate</div>
                                                        <div className="font-bold text-green-600">{fd.fdROI}%</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-slate-500 uppercase tracking-wider">Est. Return</div>
                                                        <div className="font-bold text-blue-600">₹{interestAmount.toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-slate-500 text-center py-8">No active fixed deposits found.</p>
                            )}
                        </div>
                    </section>

                    {/* Recent Transactions */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
                        <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border/50 h-full">
                            <h3 className="text-lg font-semibold mb-4">Transactions</h3>
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {transactions.length > 0 ? (
                                    transactions.map((tx, idx) => (
                                        <div key={idx} className="flex gap-4 items-start pb-4 border-b border-border last:border-0 last:pb-0">
                                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${tx.dbParticular.includes('Withdrawal') ? 'bg-red-500' : 'bg-green-500'}`} />
                                            <div className="flex-grow">
                                                <div className="font-medium text-sm line-clamp-1">{tx.dbParticular}</div>
                                                <div className="text-xs text-muted">{tx.dbTranDt}</div>
                                            </div>
                                            <div className={`font-bold text-sm whitespace-nowrap ${tx.dbParticular.includes('Withdrawal') ? 'text-red-500' : 'text-green-500'}`}>
                                                {tx.dbParticular.includes('Withdrawal') ? '-' : '+'} ₹{tx.dbAmt.toLocaleString()}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted text-center py-4 text-sm">No recent transactions.</p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

            </main>

            <Footer />
        </div>
    );
}
