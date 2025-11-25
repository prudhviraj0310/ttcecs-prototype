'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function WhyChoose() {
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

  const features = [
    {
      icon: '💸',
      title: 'Low-Cost Loans',
      description: 'Competitive loan interest rates for members at just 6.99% flat rate',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔒',
      title: 'Secure Savings',
      description: 'Fixed/Savings deposits with attractive returns up to 14.40%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '👥',
      title: 'Open Membership',
      description: 'SETC employees and general public can join our community',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⚖️',
      title: 'Member-First Governance',
      description: 'Democratically elected Board ensuring transparency',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🏥',
      title: 'Community & Welfare',
      description: 'Education, healthcare & support through our subsidiaries',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section className={`py-20 px-6 ${isDark ? 'bg-[#0a1628]' : 'bg-gradient-to-b from-white to-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
            Why Choose Thecos?
          </h2>
          <p className={`text-lg ${isDark ? 'text-muted' : 'text-brand-gray'} max-w-2xl mx-auto`}>
            Your trusted partner for financial security and growth since 1991
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${isDark ? 'bg-[#0f1f3a]' : 'bg-white'} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 group`}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
                {feature.title}
              </h3>
              <p className={`${isDark ? 'text-muted' : 'text-brand-gray'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
