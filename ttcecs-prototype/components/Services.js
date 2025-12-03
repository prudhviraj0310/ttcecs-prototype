'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const services = [
  {
    title: 'Savings & Deposits',
    desc: 'Fixed deposits, recurring deposits, and specially designed savings programs with high returns.',
    image: '/growth-chart.jpg',
    icon: '💰'
  },
  {
    title: 'Loan Facilities',
    desc: 'Personal, education, emergency, and other essential loan products at competitive rates.',
    image: '/financial-planning.jpg',
    icon: '💳'
  },
  {
    title: 'Member Welfare',
    desc: 'Financial guidance, welfare initiatives, and assistance programs for employees and families.',
    image: '/team-meeting.jpg',
    icon: '🤝'
  },
  {
    title: 'Digital Services',
    desc: 'Online fund transfers, mobile app support, WhatsApp communication, and SMS notifications.',
    image: '/banking-services.jpg',
    icon: '📱'
  }
];

export default function Services() {
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

  return (
    <section id="services" className={`px-6 py-20 ${isDark ? 'bg-[#0a1628]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
            What We Do
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
            Comprehensive financial services tailored for transport employees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`${isDark ? 'bg-[#0f1f3a]' : 'bg-white'} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-4xl">{s.icon}</div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`font-bold text-xl mb-3 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
                  {s.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
                  {s.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
