
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await res.json();

            if (res.ok) {
                setStep(2);
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                // Save user to localStorage for demo persistence
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/dashboard');
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-text">
            <Head>
                <title>Login - TTCECS</title>
            </Head>
            <Header />

            <main className="flex-grow flex items-center justify-center p-4 relative z-10" style={{ paddingTop: '180px' }}>
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                    <h1 className="text-3xl font-bold mb-6 text-center text-slate-900">Member Login</h1>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">
                            {error}
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-slate-700">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your registered mobile number"
                                    className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 shadow-md"
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-slate-700">Enter OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 placeholder:text-gray-400"
                                    required
                                />
                                <p className="text-xs text-slate-500 mt-1 text-right">
                                    (Use '123456' for demo)
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 shadow-md"
                            >
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
                            >
                                Back to Phone Number
                            </button>
                        </form>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
