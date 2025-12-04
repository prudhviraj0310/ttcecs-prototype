import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Downloads() {
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

  const downloads = [
    {
      title: 'Member Admission Form',
      description: 'Application form for new membership. Join the TTCECS family today.',
      file: '/forms/member-admission-form.pdf',
      icon: '📝',
      color: 'from-blue-500 to-cyan-500',
      size: '190 KB'
    },
    {
      title: 'Fixed Deposit Form',
      description: 'Application form for opening a new Fixed Deposit account.',
      file: '/forms/fixed-deposit-form.pdf',
      icon: '💰',
      color: 'from-green-500 to-emerald-500',
      size: '815 KB'
    },
    {
      title: 'Recurring Deposit Form',
      description: 'Start saving monthly with our Recurring Deposit scheme.',
      file: '/forms/recurring-deposit-form.pdf',
      icon: '🔄',
      color: 'from-purple-500 to-pink-500',
      size: '427 KB'
    },
    {
      title: 'Loan Application Form',
      description: 'Apply for personal, educational, or housing loans.',
      file: '/forms/loan-form.pdf',
      icon: '💳',
      color: 'from-orange-500 to-red-500',
      size: '726 KB'
    },
    {
      title: 'Audit Report 2024-25',
      description: 'Annual financial audit report and performance review.',
      file: '/forms/audit-report-2024-25.pdf',
      icon: '📊',
      color: 'from-indigo-500 to-purple-500',
      size: '4.3 MB',
      featured: true
    },
    {
      title: 'Document 1764844128',
      description: 'Downloadable document.',
      file: '/forms/1764844128.pdf',
      icon: '📄',
      color: 'from-teal-500 to-cyan-500',
      size: 'PDF'
    },
    {
      title: 'Document 1764844210',
      description: 'Downloadable document.',
      file: '/forms/1764844210.pdf',
      icon: '📄',
      color: 'from-rose-500 to-pink-500',
      size: 'PDF'
    }
  ];

  return (
    <>
      <Head>
        <title>Downloads & Resources | THECOS</title>
        <meta name="description" content="Download application forms for membership, fixed deposits, recurring deposits, loans, and annual audit reports." />
      </Head>

      <Header />

      <main className={`pt-24 pb-20 min-h-screen ${isDark ? 'bg-[#071428]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl md:text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
              Downloads & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Resources</span>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
              Access all the necessary forms and documents you need for your financial journey with THECOS.
            </p>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`mb-16 p-8 rounded-3xl ${isDark ? 'bg-[#0f1f3a] border border-[#1a2942]' : 'bg-white shadow-xl border border-gray-100'}`}
          >
            <h2 className={`text-2xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-brand-teal'}`}>How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="relative">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 ${isDark ? 'bg-[#1a2942] text-brand-blue' : 'bg-blue-50 text-brand-blue'}`}>
                  1
                </div>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Download Form</h3>
                <p className={`text-sm ${isDark ? 'text-muted' : 'text-gray-600'}`}>Select and download the PDF form you need.</p>
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent transform translate-x-1/2 opacity-30" />
              </div>
              <div className="relative">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 ${isDark ? 'bg-[#1a2942] text-brand-green' : 'bg-green-50 text-brand-green'}`}>
                  2
                </div>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Print & Fill</h3>
                <p className={`text-sm ${isDark ? 'text-muted' : 'text-gray-600'}`}>Print the form and fill in your details clearly.</p>
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent transform translate-x-1/2 opacity-30" />
              </div>
              <div>
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 ${isDark ? 'bg-[#1a2942] text-brand-pink' : 'bg-pink-50 text-brand-pink'}`}>
                  3
                </div>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Submit</h3>
                <p className={`text-sm ${isDark ? 'text-muted' : 'text-gray-600'}`}>Submit the filled form at your nearest branch.</p>
              </div>
            </div>
          </motion.div>

          {/* Downloads Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {downloads.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-3xl p-8 flex flex-col ${isDark
                  ? 'bg-[#0f1f3a] border border-[#1a2942]'
                  : 'bg-white border border-gray-100 shadow-xl'
                  } ${item.featured ? 'md:col-span-2 lg:col-span-1 ring-2 ring-brand-blue' : ''}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {item.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-[#1a2942] text-white' : 'bg-gray-100 text-gray-700'}`}>
                    PDF
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
                  {item.title}
                </h3>
                <p className={`mb-8 text-sm flex-grow ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
                  {item.description}
                </p>

                <div className="mt-auto">
                  <div className={`flex items-center justify-between text-xs font-medium mb-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                    <span>File Size: {item.size}</span>
                  </div>
                  <a
                    href={item.file}
                    download
                    className={`w-full block py-3 rounded-xl font-bold text-white text-center shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${item.color}`}
                  >
                    Download Form
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Need Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-3xl text-center ${isDark ? 'bg-[#0f1f3a] border border-[#1a2942]' : 'bg-blue-50 border border-blue-100'}`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-brand-teal'}`}>Need help with the forms?</h3>
            <p className={`mb-6 ${isDark ? 'text-muted' : 'text-gray-600'}`}>
              Our support team is here to assist you with filling out applications or answering any questions.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="tel:+919025947007" className={`flex items-center gap-2 font-bold ${isDark ? 'text-brand-blue' : 'text-brand-blue'}`}>
                <span>📞</span> +91 90259 47007
              </a>
              <a href="mailto:support@thecos.com" className={`flex items-center gap-2 font-bold ${isDark ? 'text-brand-blue' : 'text-brand-blue'}`}>
                <span>✉️</span> support@thecos.com
              </a>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}
