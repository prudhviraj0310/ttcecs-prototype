'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function QuickLinks() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const getTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    };
    getTheme();

    const observer = new MutationObserver(getTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const links = [
    {
      title: 'Membership',
      subtitle: 'How to Join',
      icon: '👥',
      href: '/membership',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Deposits',
      subtitle: 'Fixed Deposit Plans',
      icon: '💎',
      href: '/deposits',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Loans',
      subtitle: 'Apply for a Loan',
      icon: '💳',
      href: '/loans',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Subsidiaries',
      subtitle: 'Our Group Companies',
      icon: '🏢',
      href: '/subsidiaries',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'News / Notices',
      subtitle: 'Latest Announcements',
      icon: '📰',
      href: '/news',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Downloads',
      subtitle: 'Forms & Reports',
      icon: '📥',
      href: '/downloads',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className={`py-20 px-6 ${isDark ? 'bg-[#071428]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
            🔗 Quick Links
          </h2>
          <p className={`text-lg ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
            Navigate to what you need in just one click
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`${isDark ? 'bg-[#0f1f3a]' : 'bg-gradient-to-br from-gray-50 to-white'} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all group border-2 ${isDark ? 'border-[#1a2942]' : 'border-gray-100'} overflow-hidden relative`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${link.color} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}>
                  {link.icon}
                </div>
                <h3 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-brand-teal'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${link.color} transition-all`}>
                  {link.title}
                </h3>
                <p className={`${isDark ? 'text-muted' : 'text-brand-gray'} text-sm`}>
                  {link.subtitle}
                </p>
                <div className="mt-4 flex items-center gap-2 text-brand-blue font-bold group-hover:gap-4 transition-all">
                  <span>Learn More</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
