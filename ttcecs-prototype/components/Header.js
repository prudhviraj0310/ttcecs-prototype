'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const [shrink, setShrink] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 36);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${shrink
          ? isDark
            ? 'bg-[#071428]/90 backdrop-blur-lg shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-lg shadow-lg'
          : isDark
            ? 'bg-[#071428]/80 backdrop-blur-sm'
            : 'bg-white/80 backdrop-blur-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <div className="relative w-32 h-12 md:w-40 md:h-16 transition-transform hover:scale-105">
              <Image
                src="/logo.png"
                alt="THECOS Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="/" className={`${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}>
              Home
            </a>
            <a href="/about" className={`${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}>
              About Us
            </a>
            <a href="/membership" className={`${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}>
              Membership
            </a>
            <a href="/deposits" className={`${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}>
              Deposits
            </a>
            <a href="/loans" className={`${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}>
              Loans
            </a>
            <a href="/subsidiaries" className={`${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}>
              Subsidiaries
            </a>
            <a href="/contact" className={`${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}>
              Contact
            </a>
            <a href="/downloads" className={`${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}>
              Downloads
            </a>

            {/* Font Size Toggle */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              <button
                onClick={() => {
                  const root = document.documentElement;
                  const current = parseFloat(getComputedStyle(root).fontSize);
                  if (current > 12) root.style.fontSize = `${current - 1}px`;
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isDark ? 'bg-[#1a2942] text-white hover:bg-[#2a3952]' : 'bg-gray-100 text-brand-teal hover:bg-gray-200'} transition-colors`}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                onClick={() => {
                  const root = document.documentElement;
                  const current = parseFloat(getComputedStyle(root).fontSize);
                  if (current < 24) root.style.fontSize = `${current + 1}px`;
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg ${isDark ? 'bg-[#1a2942] text-white hover:bg-[#2a3952]' : 'bg-gray-100 text-brand-teal hover:bg-gray-200'} transition-colors`}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Theme Toggle */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center overflow-hidden transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: theme === 'light' ? 0 : 180,
                  scale: theme === 'light' ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute text-brand-teal"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  rotate: theme === 'dark' ? 0 : -180,
                  scale: theme === 'dark' ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </motion.div>
            </motion.button>

            {/* CTA Button with gradient */}
            <motion.a
              href="/membership"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 48, 61, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-lg font-bold text-white shadow-md bg-gradient-primary"
            >
              Become a Member
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full ${isDark ? 'bg-[#1a2942]' : 'bg-brand-gray-light'} flex items-center justify-center cursor-pointer`}
              aria-label="Toggle theme"
            >
              <span className="text-sm font-semibold">{theme === 'light' ? 'Light' : 'Dark'}</span>
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`w-10 h-10 flex flex-col items-center justify-center gap-1.5 ${isDark ? 'text-white' : 'text-brand-teal'}`}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0,
                }}
                className="w-5 h-0.5 bg-current"
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                className="w-5 h-0.5 bg-current"
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0,
                }}
                className="w-5 h-0.5 bg-current"
              />
            </button>
          </div>
        </div>

        {/* Professional separator line */}
        <div className={`h-[1px] w-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`} />
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : -20,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-16 left-0 right-0 z-40 md:hidden"
      >
        <div className={`mx-4 mt-2 ${isDark ? 'bg-[#0a1628]' : 'bg-white'} rounded-2xl p-6 shadow-2xl ${isDark ? 'border-2 border-[#1a2942]' : 'border-2 border-brand-gray-light'}`}>
          <nav className="flex flex-col gap-4">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-bold ${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}
            >
              Home
            </a>
            <a
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-bold ${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}
            >
              About Us
            </a>
            <a
              href="/membership"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-bold ${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}
            >
              Membership
            </a>
            <a
              href="/deposits"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-bold ${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}
            >
              Deposits
            </a>
            <a
              href="/loans"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-bold ${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}
            >
              Loans
            </a>
            <a
              href="/subsidiaries"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-bold ${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}
            >
              Subsidiaries
            </a>
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-bold ${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}
            >
              Contact
            </a>
            <a
              href="/downloads"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-bold ${isDark ? 'text-white hover:text-brand-blue' : 'text-brand-teal hover:text-brand-blue'} transition-colors`}
            >
              Downloads
            </a>
            <a
              href="/membership"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 px-6 py-3 rounded-lg font-bold text-white text-center shadow-lg"
              style={{ background: 'linear-gradient(90deg, #EA2E89 0%, #27A9E1 100%)' }}
            >
              Become a Member
            </a>
          </nav>
        </div>
      </motion.div>
    </>
  );
}
