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
      className={`relative min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden ${bgGradient} px-6`}
    >
      {/* Subtle rainbow particles background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-pink/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-32 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-brand-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-brand-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main ROI Card with Rainbow Border */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Rainbow gradient border wrapper */}
        <div className="rounded-2xl p-[3px] bg-gradient-rainbow shadow-xl">
          <div className={`${isDark ? 'bg-[#0a1628]' : 'bg-white'} rounded-2xl px-12 py-8 shadow-2xl`}>
            <p className={`uppercase tracking-wider text-xs font-bold mb-2 ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
              Annual Returns
            </p>
            {showCounter && (
              <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className={`text-7xl md:text-8xl font-black ${isDark ? 'text-electric' : 'text-brand-teal'}`}
              >
                <CountUp start={0} end={14.40} duration={2.5} decimals={2} suffix="%" />
              </motion.h1>
            )}
            <p className={`text-sm mt-3 font-medium ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
              Best-in-class Fixed Deposit rates
            </p>
          </div>
        </div>
      </motion.div>

      {/* Hero headline with gradient text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 text-4xl md:text-6xl font-black text-gradient-rainbow"
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
        Thiruvalluvar Transport Corporation Employees' Co-operative Credit Society Ltd. — Savings, Loans & Financial Security for All Members.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        {/* Primary button with gradient */}
        <motion.a
          href="/membership"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(39, 169, 225, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-xl font-bold text-white shadow-lg"
          style={{ background: 'linear-gradient(90deg, #27A9E1 0%, #76C043 100%)' }}
        >
          Become a Member
        </motion.a>

        {/* Secondary button */}
        <motion.a
          href="/loans"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-4 rounded-xl font-bold ${isDark ? 'text-white bg-[#0a1628] border-[#1a2942]' : 'text-brand-teal bg-white border-brand-gray-light'} border-2 shadow-lg relative overflow-hidden group`}
        >
          <span className="relative z-10">Explore Loan Options</span>
          <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity" />
        </motion.a>

        {/* Tertiary button */}
        <motion.a
          href="/deposits"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-4 rounded-xl font-bold ${isDark ? 'text-white bg-[#0a1628] border-[#1a2942]' : 'text-brand-teal bg-white border-brand-gray-light'} border-2 shadow-lg relative overflow-hidden group`}
        >
          <span className="relative z-10">View Deposit Schemes</span>
          <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity" />
        </motion.a>
      </motion.div>

      {/* Member count badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-12 flex items-center gap-6 flex-wrap justify-center"
      >
        <div className={`flex items-center gap-2 px-6 py-3 rounded-full ${isDark ? 'bg-[#0a1628] border-[#1a2942]' : 'bg-white border-brand-gray-light'} shadow-lg border`}>
          <span className="text-2xl">✓</span>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>125,000+</span>
          <span className={`text-sm ${isDark ? 'text-muted' : 'text-brand-gray'}`}>Members</span>
        </div>
        <div className={`flex items-center gap-2 px-6 py-3 rounded-full ${isDark ? 'bg-[#0a1628] border-[#1a2942]' : 'bg-white border-brand-gray-light'} shadow-lg border`}>
          <span className="text-2xl">📍</span>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>6</span>
          <span className={`text-sm ${isDark ? 'text-muted' : 'text-brand-gray'}`}>Branches</span>
        </div>
        <div className={`flex items-center gap-2 px-6 py-3 rounded-full ${isDark ? 'bg-[#0a1628] border-[#1a2942]' : 'bg-white border-brand-gray-light'} shadow-lg border`}>
          <span className="text-2xl">🏆</span>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>ISO 9001</span>
          <span className={`text-sm ${isDark ? 'text-muted' : 'text-brand-gray'}`}>Certified</span>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border-4 border-brand-pink/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute bottom-20 left-10 w-16 h-16 border-4 border-brand-green/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
    </section>
  );
}
