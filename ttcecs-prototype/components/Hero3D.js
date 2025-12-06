// components/Hero3D.js - THECOS Theme-Aware
'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';

// Dynamically import the 3D scene (optional for light theme)
const CoinScene = dynamic(() => import('./CoinScene'), {
  ssr: false,
  loading: () => null
});

export default function Hero3D() {
  const [showCounter, setShowCounter] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const timer = setTimeout(() => setShowCounter(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Theme detection - FORCE light theme on first render
  useEffect(() => {
    const getTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      // Force light theme if nothing is set
      if (!document.documentElement.getAttribute('data-theme')) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      setTheme(currentTheme);
    };
    getTheme();

    const observer = new MutationObserver(getTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';
  const bgGradient = isDark
    ? 'bg-gradient-to-b from-[#071428] to-[#03121f]'
    : 'bg-gradient-to-b from-[#f5faff] to-white';

  return (
    <section
      id="home"
      className={`relative min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden px-6 pt-32`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/hero-finance.jpg)' }}
        />
        {/* Background with gradient - Removed to show global background */}
        {/* <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-[#071428] via-[#071428]/90 to-[#03121f]' : 'bg-gradient-to-b from-[#f5faff]/95 via-white/95 to-white'}`} />
        </div> */}
      </div>

      {/* Subtle professional particles background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Global particles handled in _app.js */}
      </div>

      {/* Main ROI Card - Professional Design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className={`${isDark ? 'bg-[#0a1628] border-white/5' : 'bg-white border-gray-100'} border rounded-2xl px-12 py-10 shadow-2xl`}>
          <p className={`uppercase tracking-widest text-xs font-bold mb-4 ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
            ANNUAL RETURNS
          </p>
          {showCounter && (
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className={`text-7xl md:text-9xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-brand-teal'}`}
            >
              <CountUp start={0} end={14.40} duration={2.5} decimals={2} suffix="%" />
            </motion.h1>
          )}
          <div className={`h-1 w-24 mx-auto mt-6 mb-4 rounded-full bg-gradient-gold`} />
          <p className={`text-lg font-medium ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
            Industry Leading Fixed Deposit Rates
          </p>
        </div>
      </motion.div>

      {/* Hero headline with gradient text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 text-4xl md:text-6xl font-black text-gradient-primary tracking-tight"
      >
        Empowering Members Since 1991
      </motion.h2>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`mt-6 text-lg md:text-xl max-w-3xl leading-relaxed ${isDark ? 'text-muted' : 'text-brand-gray'}`}
      >
        Thiruvalluvar Transport Corporation Employees' Co-operative Credit Society Ltd. — <br className="hidden md:block" />
        Secure Savings, Low-Interest Loans & Financial Growth.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-12 flex flex-col sm:flex-row gap-4"
      >
        {/* Primary button with gradient */}
        <motion.a
          href="/membership"
          whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 48, 61, 0.2)' }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 rounded-lg font-bold text-white shadow-lg bg-gradient-primary min-w-[200px]"
        >
          Become a Member
        </motion.a>

        {/* Secondary button */}
        <motion.a
          href="/loans"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-8 py-4 rounded-lg font-bold ${isDark ? 'text-white bg-white/5 border-white/10' : 'text-brand-teal bg-white border-gray-200'} border shadow-lg min-w-[200px]`}
        >
          Explore Loans
        </motion.a>

        {/* Tertiary button */}
        <motion.a
          href="/deposits"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-8 py-4 rounded-lg font-bold ${isDark ? 'text-white bg-white/5 border-white/10' : 'text-brand-teal bg-white border-gray-200'} border shadow-lg min-w-[200px]`}
        >
          View Deposits
        </motion.a>
      </motion.div>

      {/* Member count badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-16 flex items-center gap-8 flex-wrap justify-center opacity-80"
      >
        <div className="flex flex-col items-center">
          <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>125,000+</span>
          <span className={`text-xs uppercase tracking-wider ${isDark ? 'text-muted' : 'text-brand-gray'}`}>Members</span>
        </div>
        <div className={`h-8 w-[1px] ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
        <div className="flex flex-col items-center">
          <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>6</span>
          <span className={`text-xs uppercase tracking-wider ${isDark ? 'text-muted' : 'text-brand-gray'}`}>Branches</span>
        </div>
        <div className={`h-8 w-[1px] ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
        <div className="flex flex-col items-center">
          <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>1991</span>
          <span className={`text-xs uppercase tracking-wider ${isDark ? 'text-muted' : 'text-brand-gray'}`}>Established</span>
        </div>
      </motion.div>
    </section>
  );
}
