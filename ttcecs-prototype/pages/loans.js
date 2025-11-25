import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function Loans() {
  return (
    <>
      <Head>
        <title>Loans — Affordable Loans at 6.99% | THECOS</title>
        <meta name="description" content="THECOS offers affordable loans at 6.99% flat rate - Surety Loan, Gold Loan, Consumer Loan, and Marriage Advance for members." />
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
                Member Loans
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Affordable loans at just <span className="font-black text-[#EA2E89]">6.99%</span> flat rate per annum
              </p>
            </motion.div>
          </div>
        </section>

        {/* Loan Products Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">Loan Products We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: '',
                  title: 'Surety Loan',
                  rate: '6.99%',
                  desc: 'Salary-based loan requiring 2 employee sureties',
                  features: ['Based on monthly salary', 'Easy EMI repayment', 'Salary deduction available']
                },
                {
                  icon: '🪙',
                  title: 'Gold Loan',
                  rate: '6.99%',
                  desc: 'Secure loan against gold ornaments',
                  features: ['No labor/wastage charges', 'Affordable interest', 'Quick processing']
                },
                {
                  icon: '',
                  title: 'Consumer Loan',
                  rate: '6.99%',
                  desc: 'For household goods and appliances',
                  features: ['Up to ₹1,00,000', 'Flexible tenure', 'Simple documentation']
                },
                {
                  icon: '',
                  title: 'Marriage Advance',
                  rate: 'Interest Free',
                  desc: 'For child\'s marriage expenses',
                  features: ['₹1,00,000 loan amount', 'No interest charged', 'Member welfare benefit']
                }
              ].map((loan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl">{loan.icon}</div>
                    <div className="bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white px-4 py-2 rounded-full font-bold">
                      {loan.rate}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-gray-900 dark:text-white">{loan.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{loan.desc}</p>
                  <ul className="space-y-2">
                    {loan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-[#27A9E1] text-xl">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Loan Features Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/10 to-[#27A9E1]/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">Loan Features & Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '', title: 'Low Interest', desc: 'Just 6.99% flat per annum' },
                { icon: '', title: 'Easy Repayment', desc: 'EMI via salary deduction or mandate' },
                { icon: '', title: 'Transparent Process', desc: 'No hidden fees or charges' },
                { icon: '🤝', title: 'Support Available', desc: 'Documentation assistance provided' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all hover:scale-105 text-center"
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms & Conditions Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-4xl font-black mb-8 text-gray-900 dark:text-white">Loan Terms & Conditions</h2>
              <div className="space-y-6">
                {[
                  { icon: '', title: 'Minimum Tenure', desc: '24 months repayment period (varies for FD-backed loans)' },
                  { icon: '', title: 'FD Loan Rule', desc: 'FD cannot be withdrawn until full loan repayment' },
                  { icon: '', title: 'EMI Due Date', desc: '5th of every month' },
                  { icon: '⚠️', title: 'Late Payment Penalty', desc: '4% penalty on overdue EMI amount' },
                  { icon: '', title: 'Surety Required', desc: 'Surety/nominee required for all loan types' },
                  { icon: '', title: 'Large Loans', desc: 'Loans above ₹5 lakh require 2 sureties' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-[#1a2942] rounded-xl"
                  >
                    <div className="text-4xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#27A9E1]/10 to-[#EA2E89]/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-4xl font-black mb-8 text-gray-900 dark:text-white">Required Documents</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#27A9E1] mb-4">General Documents</h3>
                  <ul className="space-y-3">
                    {[
                      'Duly completed loan application form',
                      'Signed promissory note',
                      'Salary slip (for salary-based loans)',
                      'NOC from Pay Disbursing Officer',
                      'ID proof (Aadhar, PAN)',
                      'Address proof'
                    ].map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="text-[#27A9E1] text-xl flex-shrink-0"></span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#EA2E89] mb-4">Loan-Specific Documents</h3>
                  <ul className="space-y-3">
                    {[
                      'Original FD bond (for FD loans)',
                      'Gold ornament details (for gold loans)',
                      'Property title documents (for mortgage loans)',
                      'Legal opinion (for property loans)',
                      '2 sureties info (for loans > ₹5 lakh)',
                      'Marriage invitation (for marriage advance)'
                    ].map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="text-[#EA2E89] text-xl flex-shrink-0"></span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">How to Apply — Simple Steps</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', icon: '', title: 'Download Form', desc: 'Get loan application form' },
                { step: '02', icon: '', title: 'Attach Documents', desc: 'Collect required papers' },
                { step: '03', icon: '', title: 'Submit Application', desc: 'At branch or online portal' },
                { step: '04', icon: '', title: 'Get Approval', desc: 'Disbursement after approval' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all text-center"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white font-black text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    {item.step}
                  </div>
                  <div className="mt-8">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] rounded-3xl shadow-2xl p-12"
            >
              <h2 className="text-4xl font-black mb-6 text-white">Need a Loan?</h2>
              <p className="text-xl text-white/90 mb-8">
                Apply for affordable member loans at just 6.99% flat rate
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-[#EA2E89] rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Contact Us
                </motion.a>
                <motion.a
                  href="/downloads"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Download Forms
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
