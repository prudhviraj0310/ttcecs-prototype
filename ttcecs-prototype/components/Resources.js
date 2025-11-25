// components/Resources.js
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const resources = [
  {
    id: 1,
    title: 'Annual Report 2024',
    description: 'Comprehensive overview of our financial performance and achievements',
    icon: '',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    downloadLink: '#',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: 'ISO 9001:2015 Certificate',
    description: 'Quality management system certification',
    icon: '',
    fileType: 'PDF',
    fileSize: '850 KB',
    downloadLink: '#',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    title: 'Society Information',
    description: 'Registration details, bylaws, and governance structure',
    icon: '',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    downloadLink: '#',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    title: 'FD Application Form',
    description: 'Downloadable form for fixed deposit account opening',
    icon: '',
    fileType: 'PDF',
    fileSize: '450 KB',
    downloadLink: '#',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 5,
    title: 'Smart Card User Guide',
    description: 'Instructions for activating and using your Thecos Smart Card',
    icon: '',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadLink: '#',
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 6,
    title: 'Interest Rate Schedule',
    description: 'Current rates for all deposit schemes and loan products',
    icon: '',
    fileType: 'PDF',
    fileSize: '600 KB',
    downloadLink: '#',
    color: 'from-pink-500 to-pink-600'
  },
];

function ResourceCard({ resource, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass rounded-2xl p-6 flex flex-col h-full border border-white/5 hover:border-electric/30 transition-all duration-300 group"
    >
      {/* Icon */}
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
        {resource.icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold mb-2 group-hover:text-electric transition-colors">
        {resource.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-4 flex-grow">
        {resource.description}
      </p>

      {/* File Info */}
      <div className="flex items-center justify-between text-xs text-muted mb-4 pb-4 border-b border-white/10">
        <span className="font-semibold">{resource.fileType}</span>
        <span>{resource.fileSize}</span>
      </div>

      {/* Download Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-electric/10 hover:bg-electric hover:text-[#00121a] text-electric py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        onClick={() => window.open(resource.downloadLink, '_blank')}
      >
        <span>Download</span>
        <span>⬇️</span>
      </motion.button>
    </motion.div>
  );
}

export default function Resources() {
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
    <section id="resources" className={`py-24 ${isDark ? "bg-gradient-to-b from-[#071428] to-[#03121f]" : "bg-gradient-to-b from-white to-[#F5FAFF]"} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(39,169,225,0.12)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Downloads & Resources</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Access important documents, forms, and information to help you make the most of your membership
          </p>
        </motion.div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>

        {/* ISO Certification Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 glass p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-4xl shadow-2xl animate-pulse">
              
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">ISO 9001:2015 Certified</h3>
              <p className="text-sm text-muted">Quality management system approved</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-electric text-[#00121a] rounded-lg font-semibold hover:shadow-lg hover:shadow-electric/50 transition"
          >
            View Certificate
          </motion.button>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted mt-8"
        >
          Need assistance? Contact our support team at{' '}
          <a href="mailto:support@thecos.com" className="text-electric hover:underline">
            support@thecos.com
          </a>{' '}
          or call{' '}
          <a href="tel:+914412345678" className="text-electric hover:underline">
            +91 44 1234 5678
          </a>
        </motion.p>
      </div>
    </section>
  );
}
