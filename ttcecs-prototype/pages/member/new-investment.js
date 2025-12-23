import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import MemberLayout from '../../components/MemberLayout';

// Scheme data
const FD_SCHEMES = [
    { id: 'fd-regular', name: 'Regular FD', minAmount: 5000, tenures: [180, 365, 730, 1095], rates: { 180: 6.5, 365: 7.0, 730: 7.5, 1095: 8.0 } },
    { id: 'fd-senior', name: 'Senior Citizen FD', minAmount: 5000, tenures: [180, 365, 730, 1095], rates: { 180: 7.0, 365: 7.5, 730: 8.0, 1095: 8.5 } },
    { id: 'fd-flexi', name: 'Flexi FD', minAmount: 10000, tenures: [365, 730], rates: { 365: 7.25, 730: 7.75 } },
];

const RD_SCHEMES = [
    { id: 'rd-regular', name: 'Regular RD', minAmount: 500, tenures: [12, 24, 36, 60], rates: { 12: 6.0, 24: 6.5, 36: 7.0, 60: 7.5 } },
    { id: 'rd-flexi', name: 'Flexi RD', minAmount: 1000, tenures: [24, 36, 48], rates: { 24: 6.75, 36: 7.25, 48: 7.5 } },
];

export default function NewInvestment() {
    const router = useRouter();
    const [member, setMember] = useState(null);
    const [step, setStep] = useState(1);
    const [kycStatus, setKycStatus] = useState('verified'); // verified, pending, expired

    // Form state
    const [depositType, setDepositType] = useState('');
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [tenure, setTenure] = useState(0);
    const [amount, setAmount] = useState('');
    const [interestType, setInterestType] = useState('cumulative'); // monthly, cumulative
    const [paymentMethod, setPaymentMethod] = useState('');

    // Calculated values
    const [interestRate, setInterestRate] = useState(0);
    const [maturityAmount, setMaturityAmount] = useState(0);
    const [maturityDate, setMaturityDate] = useState('');

    // Payment state
    const [processing, setProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // success, failed
    const [receiptData, setReceiptData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('memberToken');
        const memberData = localStorage.getItem('memberData');

        if (!token || !memberData) {
            router.push('/portal');
            return;
        }

        try {
            setMember(JSON.parse(memberData));
        } catch (e) {
            router.push('/portal');
        }
    }, []);

    // Calculate maturity amount when inputs change
    useEffect(() => {
        if (selectedScheme && tenure && amount) {
            const rate = selectedScheme.rates[tenure] || 0;
            setInterestRate(rate);

            const principal = parseFloat(amount) || 0;
            const years = depositType === 'fd' ? tenure / 365 : tenure / 12;

            if (depositType === 'fd') {
                // FD compound interest
                if (interestType === 'cumulative') {
                    const maturity = principal * Math.pow((1 + rate / 100), years);
                    setMaturityAmount(Math.round(maturity));
                } else {
                    // Monthly interest payout - just principal back
                    const totalInterest = principal * (rate / 100) * years;
                    setMaturityAmount(Math.round(principal + totalInterest));
                }
            } else {
                // RD calculation
                const monthlyAmt = principal;
                const r = rate / 100 / 12;
                const n = tenure;
                const maturity = monthlyAmt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
                setMaturityAmount(Math.round(maturity));
            }

            // Calculate maturity date
            const today = new Date();
            if (depositType === 'fd') {
                today.setDate(today.getDate() + tenure);
            } else {
                today.setMonth(today.getMonth() + tenure);
            }
            setMaturityDate(today.toISOString().split('T')[0]);
        }
    }, [selectedScheme, tenure, amount, interestType, depositType]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
    };

    const handleSchemeSelect = (scheme) => {
        setSelectedScheme(scheme);
        setTenure(scheme.tenures[0]);
    };

    const handlePayment = async () => {
        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            // Simulate success (in real app, integrate with payment gateway)
            const success = Math.random() > 0.1; // 90% success rate for demo

            if (success) {
                setPaymentStatus('success');
                setReceiptData({
                    receiptNo: `${depositType.toUpperCase()}${Date.now().toString().slice(-8)}`,
                    depositNo: `${depositType.toUpperCase()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
                    type: depositType === 'fd' ? 'Fixed Deposit' : 'Recurring Deposit',
                    scheme: selectedScheme.name,
                    amount: parseFloat(amount),
                    tenure: depositType === 'fd' ? `${tenure} Days` : `${tenure} Months`,
                    interestRate: interestRate,
                    maturityDate: maturityDate,
                    maturityAmount: maturityAmount,
                    paymentMethod: paymentMethod,
                    dateTime: new Date().toLocaleString('en-IN'),
                    memberNo: member.MNo,
                    memberName: member.Name,
                });
                setStep(6);
            } else {
                setPaymentStatus('failed');
            }
            setProcessing(false);
        }, 3000);
    };

    const printReceipt = () => {
        window.print();
    };

    const resetForm = () => {
        setStep(1);
        setDepositType('');
        setSelectedScheme(null);
        setTenure(0);
        setAmount('');
        setPaymentMethod('');
        setPaymentStatus(null);
        setReceiptData(null);
    };

    // KYC Check
    if (kycStatus !== 'verified' && step === 1) {
        return (
            <MemberLayout title="New Investment" member={member}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
                >
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">KYC Verification Required</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your KYC is {kycStatus === 'pending' ? 'pending verification' : 'expired'}.
                        Please complete your KYC at the branch to make new investments.
                    </p>
                    <button
                        onClick={() => router.push('/member')}
                        className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-300 transition-colors"
                    >
                        Go Back to Dashboard
                    </button>
                </motion.div>
            </MemberLayout>
        );
    }

    return (
        <MemberLayout title="New Investment" member={member}>
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                    {['Type', 'Scheme', 'Details', 'Review', 'Payment', 'Receipt'].map((label, idx) => (
                        <div key={label} className="flex items-center">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                                ${step > idx + 1 ? 'bg-green-500 text-white' : step === idx + 1 ? 'bg-brand-teal text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}
                            `}>
                                {step > idx + 1 ? '✓' : idx + 1}
                            </div>
                            {idx < 5 && (
                                <div className={`w-8 md:w-16 h-1 ${step > idx + 1 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* Step 1: Choose Type */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            Choose Investment Type
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <button
                                onClick={() => { setDepositType('fd'); setStep(2); }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-100 dark:border-gray-700 hover:border-brand-teal hover:shadow-xl transition-all text-center group"
                            >
                                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-4xl">💰</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fixed Deposit</h3>
                                <p className="text-gray-500">Invest a lump sum amount and earn guaranteed returns</p>
                                <p className="mt-4 text-sm font-medium text-brand-teal">Up to 8.5% p.a.</p>
                            </button>
                            <button
                                onClick={() => { setDepositType('rd'); setStep(2); }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-100 dark:border-gray-700 hover:border-brand-teal hover:shadow-xl transition-all text-center group"
                            >
                                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-4xl">📊</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Recurring Deposit</h3>
                                <p className="text-gray-500">Save monthly and build wealth systematically</p>
                                <p className="mt-4 text-sm font-medium text-brand-teal">Up to 7.5% p.a.</p>
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Select Scheme */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            Select {depositType === 'fd' ? 'Fixed Deposit' : 'Recurring Deposit'} Scheme
                        </h2>
                        <div className="space-y-4">
                            {(depositType === 'fd' ? FD_SCHEMES : RD_SCHEMES).map((scheme) => (
                                <button
                                    key={scheme.id}
                                    onClick={() => { handleSchemeSelect(scheme); setStep(3); }}
                                    className={`w-full bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-2 text-left transition-all hover:shadow-lg ${selectedScheme?.id === scheme.id ? 'border-brand-teal' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{scheme.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Min: {formatCurrency(scheme.minAmount)} | Tenures: {scheme.tenures.map(t => depositType === 'fd' ? `${t} days` : `${t} months`).join(', ')}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-brand-teal">
                                                {Math.max(...Object.values(scheme.rates))}%
                                            </p>
                                            <p className="text-xs text-gray-500">max rate</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep(1)}
                            className="mt-6 px-6 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                            ← Back
                        </button>
                    </motion.div>
                )}

                {/* Step 3: Enter Details */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            Enter Investment Details
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 space-y-6">
                            {/* Tenure Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Select Tenure
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {selectedScheme?.tenures.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTenure(t)}
                                            className={`py-3 px-4 rounded-xl font-medium transition-all ${tenure === t
                                                    ? 'bg-brand-teal text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                                }`}
                                        >
                                            {depositType === 'fd' ? `${t} Days` : `${t} Months`}
                                            <span className="block text-xs opacity-80">{selectedScheme.rates[t]}% p.a.</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {depositType === 'fd' ? 'Deposit Amount' : 'Monthly Installment'}
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min={selectedScheme?.minAmount}
                                        placeholder={`Min ${formatCurrency(selectedScheme?.minAmount)}`}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-brand-teal text-xl font-bold"
                                    />
                                </div>
                            </div>

                            {/* Interest Type (FD only) */}
                            {depositType === 'fd' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Interest Payout
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setInterestType('cumulative')}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${interestType === 'cumulative'
                                                    ? 'border-brand-teal bg-brand-teal/5'
                                                    : 'border-gray-200 dark:border-gray-700'
                                                }`}
                                        >
                                            <p className="font-semibold text-gray-900 dark:text-white">Cumulative</p>
                                            <p className="text-xs text-gray-500">Interest at maturity</p>
                                        </button>
                                        <button
                                            onClick={() => setInterestType('monthly')}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${interestType === 'monthly'
                                                    ? 'border-brand-teal bg-brand-teal/5'
                                                    : 'border-gray-200 dark:border-gray-700'
                                                }`}
                                        >
                                            <p className="font-semibold text-gray-900 dark:text-white">Monthly</p>
                                            <p className="text-xs text-gray-500">Monthly interest payout</p>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Maturity Calculator Preview */}
                        {amount && tenure && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 bg-gradient-to-br from-brand-teal/10 to-blue-500/10 rounded-2xl p-6 border border-brand-teal/20"
                            >
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Maturity Calculator</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Interest Rate</p>
                                        <p className="text-xl font-bold text-brand-teal">{interestRate}%</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Maturity Date</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{new Date(maturityDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-gray-500 uppercase">Maturity Amount</p>
                                        <p className="text-3xl font-bold text-green-600">{formatCurrency(maturityAmount)}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => setStep(2)}
                                className="px-6 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={() => setStep(4)}
                                disabled={!amount || parseFloat(amount) < selectedScheme?.minAmount}
                                className="px-8 py-3 bg-gradient-to-r from-brand-teal to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                            >
                                Continue →
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            Review Your Investment
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="bg-gradient-to-r from-brand-teal to-blue-600 text-white p-6">
                                <p className="text-sm opacity-80">New {depositType === 'fd' ? 'Fixed Deposit' : 'Recurring Deposit'}</p>
                                <p className="text-3xl font-bold">{formatCurrency(amount)}</p>
                                {depositType === 'rd' && <p className="text-sm opacity-80">per month</p>}
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500">Scheme</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{selectedScheme?.name}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500">Tenure</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {depositType === 'fd' ? `${tenure} Days` : `${tenure} Months`}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500">Interest Rate</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{interestRate}% p.a.</span>
                                </div>
                                {depositType === 'fd' && (
                                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-500">Interest Type</span>
                                        <span className="font-medium text-gray-900 dark:text-white capitalize">{interestType}</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500">Maturity Date</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {new Date(maturityDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4 -mx-2">
                                    <span className="font-semibold text-gray-900 dark:text-white">Maturity Amount</span>
                                    <span className="text-2xl font-bold text-green-600">{formatCurrency(maturityAmount)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button onClick={() => setStep(3)} className="px-6 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400">
                                ← Back
                            </button>
                            <button
                                onClick={() => setStep(5)}
                                className="px-8 py-3 bg-gradient-to-r from-brand-teal to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                            >
                                Proceed to Payment →
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 5: Payment */}
                {step === 5 && (
                    <motion.div
                        key="step5"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            Select Payment Method
                        </h2>

                        {paymentStatus === 'failed' && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">❌</span>
                                    <div>
                                        <p className="font-semibold text-red-700 dark:text-red-400">Transaction Failed</p>
                                        <p className="text-sm text-red-600 dark:text-red-500">Please try again or use a different payment method</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
                                <p className="text-sm text-gray-500">Amount Payable</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(amount)}</p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { id: 'upi', name: 'UPI', icon: '📱', desc: 'Pay via UPI apps' },
                                    { id: 'card', name: 'Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                                    { id: 'netbanking', name: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === method.id
                                                ? 'border-brand-teal bg-brand-teal/5'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="text-2xl">{method.icon}</span>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-900 dark:text-white">{method.name}</p>
                                            <p className="text-sm text-gray-500">{method.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button onClick={() => setStep(4)} className="px-6 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400">
                                ← Back
                            </button>
                            <button
                                onClick={handlePayment}
                                disabled={!paymentMethod || processing}
                                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>Pay {formatCurrency(amount)}</>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 6: Receipt */}
                {step === 6 && receiptData && (
                    <motion.div
                        key="step6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">✅</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Successful!</h2>
                            <p className="text-gray-500">Your {receiptData.type} has been created</p>
                        </div>

                        {/* Receipt */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden print:shadow-none" id="receipt">
                            <div className="bg-gradient-to-r from-brand-teal to-blue-600 text-white p-6 print:bg-gray-100 print:text-black relative">
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 text-6xl font-bold rotate-[-30deg] pointer-events-none print:opacity-20">
                                    KIOSK GENERATED
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold">TTCECS</h3>
                                    <p className="text-sm opacity-80">Tiruchengode Transport Corporation Employees Cooperative Credit Society</p>
                                    <p className="text-sm opacity-80">Reg No: XXXXX</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-3 text-sm">
                                <div className="text-center border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">
                                    <p className="font-bold text-lg text-gray-900 dark:text-white">{receiptData.type} Receipt</p>
                                    <p className="text-gray-500">Receipt No: {receiptData.receiptNo}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-500">Deposit No</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{receiptData.depositNo}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Date & Time</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{receiptData.dateTime}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Member No</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{receiptData.memberNo}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Member Name</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{receiptData.memberName}</p>
                                    </div>
                                </div>

                                <div className="border-t border-b border-gray-100 dark:border-gray-700 py-4 my-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Scheme</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{receiptData.scheme}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Amount</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(receiptData.amount)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Tenure</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{receiptData.tenure}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Interest Rate</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{receiptData.interestRate}% p.a.</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Maturity Date</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{new Date(receiptData.maturityDate).toLocaleDateString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg -mx-3">
                                        <span className="font-semibold text-gray-900 dark:text-white">Maturity Amount</span>
                                        <span className="font-bold text-green-600">{formatCurrency(receiptData.maturityAmount)}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 italic text-center">
                                    * This is an electronically generated receipt from TTCECS Kiosk
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 print:hidden">
                            <button
                                onClick={printReceipt}
                                className="px-8 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                            >
                                <span>🖨️</span> Print Receipt
                            </button>
                            <button
                                onClick={resetForm}
                                className="px-8 py-3 bg-brand-teal text-white rounded-xl font-bold hover:bg-brand-teal/90 transition-all"
                            >
                                New Investment
                            </button>
                            <button
                                onClick={() => router.push('/member')}
                                className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-300 transition-all"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MemberLayout>
    );
}
