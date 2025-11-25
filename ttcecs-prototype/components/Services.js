'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const services = [
  {
    title: 'Fixed Deposits',
    desc: 'High ROI FDs at 14.40% with flexible tenure options and renewal services.',
    image: '/growth-chart.jpg',
    icon: '💰'
  },
  {
    title: 'Loans',
    desc: 'Member loans at competitive cooperative rates with quick approval.',
    image: '/financial-planning.jpg',
    icon: '🏦'
  },
  {
    title: 'Smart Card',
    desc: 'Secure QR + OTP member access for seamless transactions.',
    image: '/banking-services.jpg',
    icon: '💳'
  },
  {
    title: 'Training',
    desc: 'Financial literacy & operational training for all members.',
    image: '/team-meeting.jpg',
    icon: '📚'
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
            Our Services
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
            Tailored financial services for transport employees — trusted and local.
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
