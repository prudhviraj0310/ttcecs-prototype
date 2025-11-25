'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
        className={`fixed w-full z-50 transition-all duration-300 ${
          shrink 
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
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center font-black text-white shadow-lg">
              TC
            </div>
            <span className={`font-black text-xl ${isDark ? 'text-white' : 'text-brand-teal'}`}>Thecos</span>
          </motion.div>

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

            {/* Theme Toggle */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-green/10 hover:from-brand-blue/20 hover:to-brand-green/20 flex items-center justify-center overflow-hidden transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: theme === 'light' ? 0 : 180,
                  scale: theme === 'light' ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <span className="text-xl">☀️</span>
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  rotate: theme === 'dark' ? 0 : -180,
                  scale: theme === 'dark' ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <span className="text-xl">🌙</span>
              </motion.div>
            </motion.button>

            {/* CTA Button with gradient */}
            <motion.a
              href="/membership"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(39, 169, 225, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-lg font-bold text-white shadow-md"
              style={{ background: 'linear-gradient(90deg, #EA2E89 0%, #27A9E1 100%)' }}
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
              <span className="text-xl">{theme === 'light' ? '☀️' : '🌙'}</span>
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
                className="w-5 h-0.5 bg-brand-teal"
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                className="w-5 h-0.5 bg-brand-teal"
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0,
                }}
                className="w-5 h-0.5 bg-brand-teal"
              />
            </button>
          </div>
        </div>

        {/* Rainbow underline */}
        <div className="h-[2px] bg-gradient-rainbow" />
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
