import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

// Cloudflare Turnstile Site Key
const TURNSTILE_SITE_KEY = '0x4AAAAAAA8IYpAAcSANSBu4';

export default function MemberPortal() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Enter MNo, 2: Enter OTP
    const [memberNumber, setMemberNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [maskedMobile, setMaskedMobile] = useState('');
    const [memberName, setMemberName] = useState('');
    const [demoOtp, setDemoOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [otpAttempts, setOtpAttempts] = useState(0);
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef(null);
    const widgetIdRef = useRef(null);
    const otpInputRefs = useRef([]);

    const MAX_OTP_ATTEMPTS = 3;
    const OTP_VALIDITY_SECONDS = 120;

    // Load Turnstile script and render widget
    useEffect(() => {
        if (step !== 1) return;

        const loadTurnstile = () => {
            if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
                widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
                    sitekey: TURNSTILE_SITE_KEY,
                    callback: (token) => {
                        setTurnstileToken(token);
                        setError('');
                    },
                    'expired-callback': () => {
                        setTurnstileToken('');
                    },
                    'error-callback': () => {
                        setError('CAPTCHA verification failed. Please try again.');
                        setTurnstileToken('');
                    },
                    theme: 'auto',
                });
            }
        };

        if (window.turnstile) {
            loadTurnstile();
        } else {
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            script.async = true;
            script.onload = loadTurnstile;
            document.head.appendChild(script);
        }

        return () => {
            if (widgetIdRef.current && window.turnstile) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }
        };
    }, [step]);

    // OTP timer effect
    useEffect(() => {
        if (otpTimer > 0) {
            const timer = setTimeout(() => setOtpTimer(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [otpTimer]);

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!turnstileToken) {
            setError('Please complete the CAPTCHA verification.');
            return;
        }

        if (!memberNumber.trim()) {
            setError('Please enter your Member Number.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memberNumber, turnstileToken }),
            });

            const data = await res.json();

            if (res.ok) {
                setMaskedMobile(data.mobileNumber);
                setMemberName(data.memberName);
                if (data.demo && data.otp) {
                    setDemoOtp(data.otp);
                }
                setOtpTimer(OTP_VALIDITY_SECONDS);
                setStep(2);
            } else {
                setError(data.message || 'Failed to send OTP. Please try again.');
                if (window.turnstile && widgetIdRef.current) {
                    window.turnstile.reset(widgetIdRef.current);
                    setTurnstileToken('');
                }
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            setError('Please enter the 6-digit OTP.');
            return;
        }

        if (otpAttempts >= MAX_OTP_ATTEMPTS) {
            setError('Maximum attempts reached. Please try again later.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memberNumber, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('memberToken', data.token);
                localStorage.setItem('memberData', JSON.stringify(data.member));
                router.push('/member');
            } else {
                setOtpAttempts(prev => prev + 1);
                setOtp('');
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value.slice(-1);
        const newOtp = otp.split('');
        newOtp[index] = value;
        setOtp(newOtp.join(''));
        if (value && index < 5) otpInputRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memberNumber }),
            });
            const data = await res.json();
            if (res.ok) {
                if (data.demo && data.otp) setDemoOtp(data.otp);
                setOtpTimer(OTP_VALIDITY_SECONDS);
                setError('');
            }
        } catch (err) {
            setError('Failed to resend OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#071428] dark:to-[#0a1628] font-sans">
            <Head>
                <title>Member Portal | THECOS</title>
                <meta name="description" content="THECOS Member Portal - Access your Fixed Deposits, Recurring Deposits, Loans and more." />
            </Head>

            <Header />

            <main className="pt-28 pb-16 px-4">
                <div className="max-w-md mx-auto">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-teal to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-teal/30">
                            <span className="text-4xl">🔐</span>
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Member Portal</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            {step === 1 ? 'Enter your Member Number to login' : `OTP sent to ${maskedMobile}`}
                        </p>
                    </motion.div>

                    {/* Login Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
                    >
                        <AnimatePresence mode="wait">
                            {/* Step 1: Enter Member Number */}
                            {step === 1 && (
                                <motion.form
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleSendOtp}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Member Number
                                        </label>
                                        <input
                                            type="text"
                                            value={memberNumber}
                                            onChange={(e) => setMemberNumber(e.target.value)}
                                            placeholder="Enter: 12345, 1001, or 1002"
                                            className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-lg font-medium focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all"
                                            autoFocus
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Test accounts: <span className="font-mono font-bold">12345</span>, <span className="font-mono font-bold">1001</span>, <span className="font-mono font-bold">1002</span>
                                        </p>
                                    </div>

                                    {/* Cloudflare Turnstile CAPTCHA */}
                                    <div className="flex justify-center">
                                        <div ref={turnstileRef}></div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm"
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading || !turnstileToken}
                                        className="w-full py-4 bg-gradient-to-r from-brand-teal to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-teal/30 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                                        ) : (
                                            <>Send OTP</>
                                        )}
                                    </button>

                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                        Don't have an account?{' '}
                                        <a href="/membership" className="text-brand-teal font-semibold hover:underline">
                                            Become a Member
                                        </a>
                                    </p>
                                </motion.form>
                            )}

                            {/* Step 2: Enter OTP */}
                            {step === 2 && (
                                <motion.form
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleVerifyOtp}
                                    className="space-y-6"
                                >
                                    {memberName && (
                                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                            <p className="text-green-700 dark:text-green-400 font-medium">Welcome, {memberName}!</p>
                                        </div>
                                    )}

                                    {/* Demo OTP Display */}
                                    {demoOtp && (
                                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-center">
                                            <p className="text-amber-600 dark:text-amber-400 text-sm">Demo Mode - Your OTP is:</p>
                                            <p className="text-2xl font-mono font-bold text-amber-700 dark:text-amber-300 tracking-widest">{demoOtp}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                                            Enter 6-digit OTP
                                        </label>
                                        <div className="flex justify-center gap-2">
                                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                                <input
                                                    key={index}
                                                    ref={(el) => (otpInputRefs.current[index] = el)}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={otp[index] || ''}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                    className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* OTP Timer */}
                                    <div className="text-center">
                                        {otpTimer > 0 ? (
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                OTP expires in <span className="text-brand-teal font-mono font-bold">{otpTimer}s</span>
                                            </p>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleResendOtp}
                                                disabled={loading}
                                                className="text-brand-teal font-semibold hover:underline text-sm"
                                            >
                                                Resend OTP
                                            </button>
                                        )}
                                    </div>

                                    {/* Attempts left */}
                                    {otpAttempts > 0 && (
                                        <p className="text-center text-sm text-orange-500">
                                            {MAX_OTP_ATTEMPTS - otpAttempts} attempt(s) left
                                        </p>
                                    )}

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center"
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading || otp.length !== 6 || otpAttempts >= MAX_OTP_ATTEMPTS}
                                        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                                        ) : (
                                            <>Verify & Login</>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => { setStep(1); setOtp(''); setError(''); setOtpAttempts(0); }}
                                        className="w-full py-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                                    >
                                        ← Back to Member Number
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Help Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                        <p>Need help? Contact us at <a href="tel:+919150070312" className="text-brand-teal font-medium">+91 91500 70312</a></p>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
