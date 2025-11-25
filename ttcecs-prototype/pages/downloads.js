import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function Downloads() {
  const downloadCategories = [
    {
      title: 'Membership Forms',
      icon: '👤',
      items: [
        { name: 'Membership Application Form', size: 'PDF, 250 KB', desc: 'Apply for new membership' },
        { name: 'Nominee Details Form', size: 'PDF, 180 KB', desc: 'Add or update nominee information' },
        { name: 'KYC Update Form', size: 'PDF, 200 KB', desc: 'Update your KYC details' }
      ]
    },
    {
      title: 'Loan Forms',
      icon: '💰',
      items: [
        { name: 'Surety Loan Application', size: 'PDF, 300 KB', desc: 'Apply for salary-based loan' },
        { name: 'Gold Loan Application', size: 'PDF, 280 KB', desc: 'Apply for gold loan' },
        { name: 'Consumer Loan Application', size: 'PDF, 290 KB', desc: 'Apply for consumer goods loan' },
        { name: 'Marriage Advance Form', size: 'PDF, 240 KB', desc: 'Apply for interest-free marriage loan' },
        { name: 'Promissory Note Template', size: 'PDF, 150 KB', desc: 'Loan agreement template' }
      ]
    },
    {
      title: 'Deposit Forms',
      icon: '📈',
      items: [
        { name: 'Fixed Deposit Application', size: 'PDF, 270 KB', desc: 'Open new FD account' },
        { name: 'FD Renewal Form', size: 'PDF, 220 KB', desc: 'Renew existing FD' },
        { name: 'FD Pre-closure Request', size: 'PDF, 200 KB', desc: 'Request early FD withdrawal' },
        { name: 'Recurring Deposit Form', size: 'PDF, 260 KB', desc: 'Open RD account' }
      ]
    },
    {
      title: 'Annual Reports',
      icon: '📊',
      items: [
        { name: 'Annual Report 2023-24', size: 'PDF, 3.5 MB', desc: 'Financial year 2023-24 report' },
        { name: 'Annual Report 2022-23', size: 'PDF, 3.2 MB', desc: 'Financial year 2022-23 report' },
        { name: 'Annual Report 2021-22', size: 'PDF, 2.9 MB', desc: 'Financial year 2021-22 report' }
      ]
    },
    {
      title: 'Election Documents',
      icon: '🗳️',
      items: [
        { name: 'Nomination Form', size: 'PDF, 230 KB', desc: 'Board election nomination form' },
        { name: 'Delegate List 2024', size: 'PDF, 450 KB', desc: 'Registered delegate list' },
        { name: 'Election Notice 2024', size: 'PDF, 280 KB', desc: 'Board election announcement' },
        { name: 'AGM Notice', size: 'PDF, 320 KB', desc: 'Annual General Meeting notice' }
      ]
    },
    {
      title: 'Bylaws & Rules',
      icon: '📜',
      items: [
        { name: 'Society Bylaws', size: 'PDF, 1.2 MB', desc: 'Thecos bylaws and constitution' },
        { name: 'Loan Policy Document', size: 'PDF, 680 KB', desc: 'Comprehensive loan policy' },
        { name: 'Deposit Scheme Rules', size: 'PDF, 540 KB', desc: 'FD and RD scheme details' },
        { name: 'Membership Guidelines', size: 'PDF, 420 KB', desc: 'Member rights and responsibilities' }
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>Downloads — Forms & Documents | Thecos</title>
        <meta name="description" content="Download Thecos forms, applications, annual reports, and policy documents - Membership forms, loan applications, FD forms, and more." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#071428] dark:to-[#0a1628]">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] bg-clip-text text-transparent">
                Downloads & Resources
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Access all forms, applications, reports, and documents you need
              </p>
            </motion.div>
          </div>
        </section>

        {/* Downloads Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            {downloadCategories.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">{category.icon}</div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">{category.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIdx) => (
                    <motion.div
                      key={itemIdx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIdx * 0.05 }}
                      className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-4xl">📄</div>
                        <div className="text-sm font-bold text-gray-500 dark:text-gray-400">{item.size}</div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#27A9E1] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{item.desc}</p>
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <span>⬇️</span>
                        <span>Download</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/10 to-[#27A9E1]/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-4xl font-black mb-6 text-center text-gray-900 dark:text-white">Need Help?</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8">
                If you can't find the form you're looking for or need assistance filling it out, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all text-center"
                >
                  Contact Support
                </motion.a>
                <motion.a
                  href="/faqs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gray-100 dark:bg-[#1a2942] text-gray-900 dark:text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all text-center"
                >
                  View FAQs
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
