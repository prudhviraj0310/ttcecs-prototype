import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MemberLayout from '../../components/MemberLayout';

export default function Statements() {
    const router = useRouter();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statementType, setStatementType] = useState('fd-interest');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selectedRD, setSelectedRD] = useState('');
    const [rds, setRds] = useState([]);
    const [statementData, setStatementData] = useState(null);
    const [generating, setGenerating] = useState(false);

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

            // Set default dates (last 1 year)
            const today = new Date();
            const lastYear = new Date();
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            setDateTo(today.toISOString().split('T')[0]);
            setDateFrom(lastYear.toISOString().split('T')[0]);

            // Fetch RDs for RD statement selection
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
        }
    };

    const generateStatement = async () => {
        setGenerating(true);
        const token = localStorage.getItem('memberToken');

        try {
            const params = new URLSearchParams({
                mno: member.MNo,
                type: statementType,
                from: dateFrom,
                to: dateTo,
                ...(selectedRD && { rdNo: selectedRD }),
            });

            const res = await fetch(`/api/member/statement?${params}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                const data = await res.json();
                setStatementData(data);
            }
        } catch (error) {
            console.error('Failed to generate statement:', error);
        } finally {
            setGenerating(false);
        }
    };

    const printStatement = () => {
        window.print();
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

    return (
        <MemberLayout title="Statements" member={member}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <span className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">📄</span>
                    Statements & Certificates
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate interest certificates and account statements
                </p>
            </motion.div>

            {/* Statement Options */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-6"
            >
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Statement Type</h2>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {[
                        { id: 'fd-interest', label: 'FD Interest Certificate', icon: '💰', desc: 'Interest earned on Fixed Deposits' },
                        { id: 'rd-statement', label: 'RD Statement', icon: '📊', desc: 'Recurring Deposit transactions' },
                        { id: 'loan-statement', label: 'Loan Statement', icon: '📉', desc: 'Loan repayment details' },
                    ].map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setStatementType(type.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${statementType === type.id
                                    ? 'border-brand-teal bg-brand-teal/5'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="text-2xl mb-2">{type.icon}</div>
                            <p className="font-semibold text-gray-900 dark:text-white">{type.label}</p>
                            <p className="text-xs text-gray-500 mt-1">{type.desc}</p>
                        </button>
                    ))}
                </div>

                {/* Date Range */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            From Date
                        </label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-brand-teal"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            To Date
                        </label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-brand-teal"
                        />
                    </div>
                </div>

                {/* RD Selection (for RD Statement) */}
                {statementType === 'rd-statement' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select RD Account
                        </label>
                        <select
                            value={selectedRD}
                            onChange={(e) => setSelectedRD(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-brand-teal"
                        >
                            <option value="">All RD Accounts</option>
                            {rds.map((rd) => (
                                <option key={rd.RDNo} value={rd.RDNo}>
                                    {rd.RDNo} - {formatCurrency(rd.RDAmt)}/month
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <button
                    onClick={generateStatement}
                    disabled={generating}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-brand-teal to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {generating ? (
                        <>
                            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                            Generating...
                        </>
                    ) : (
                        <>
                            <span>📄</span>
                            Generate Statement
                        </>
                    )}
                </button>
            </motion.div>

            {/* Statement Preview */}
            {statementData && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden print:shadow-none print:border-none"
                    id="statement-content"
                >
                    {/* Statement Header */}
                    <div className="bg-gradient-to-r from-brand-teal to-blue-600 text-white p-6 print:bg-gray-100 print:text-black">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold">TTCECS</h2>
                                <p className="text-sm opacity-80">Tiruchengode Transport Corporation Employees Cooperative Credit Society</p>
                            </div>
                            <div className="text-right text-sm opacity-80">
                                <p>Generated on: {formatDate(new Date())}</p>
                                <p>Reg No: XXXXX</p>
                            </div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4 print:bg-gray-200">
                            <h3 className="font-bold mb-1">
                                {statementType === 'fd-interest' && 'Fixed Deposit Interest Certificate'}
                                {statementType === 'rd-statement' && 'Recurring Deposit Statement'}
                                {statementType === 'loan-statement' && 'Loan Statement'}
                            </h3>
                            <p className="text-sm">Period: {formatDate(dateFrom)} to {formatDate(dateTo)}</p>
                        </div>
                    </div>

                    {/* Member Details */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Member Details</h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Member No</p>
                                <p className="font-medium text-gray-900 dark:text-white">{member?.MNo}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Name</p>
                                <p className="font-medium text-gray-900 dark:text-white">{member?.Name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Mobile</p>
                                <p className="font-medium text-gray-900 dark:text-white">{member?.Mobile_No}</p>
                            </div>
                        </div>
                    </div>

                    {/* Statement Content */}
                    <div className="p-6">
                        {statementData.items?.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="p-3 text-left font-semibold text-gray-600 dark:text-gray-300">Date</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 dark:text-gray-300">Particulars</th>
                                            <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {statementData.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="p-3 text-gray-600 dark:text-gray-400">{formatDate(item.date)}</td>
                                                <td className="p-3 text-gray-900 dark:text-white">{item.particulars}</td>
                                                <td className="p-3 text-right font-medium text-gray-900 dark:text-white">{formatCurrency(item.amount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50 dark:bg-gray-700 font-bold">
                                        <tr>
                                            <td colSpan="2" className="p-3 text-gray-900 dark:text-white">Total</td>
                                            <td className="p-3 text-right text-brand-teal">{formatCurrency(statementData.total)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p>No transactions found for the selected period</p>
                            </div>
                        )}
                    </div>

                    {/* Footer & Watermark */}
                    <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-xs text-gray-500 italic">
                                * This is an electronically generated statement and does not require signature
                            </p>
                            <div className="flex gap-3 print:hidden">
                                <button
                                    onClick={printStatement}
                                    className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                                >
                                    <span>🖨️</span> Print
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </MemberLayout>
    );
}
