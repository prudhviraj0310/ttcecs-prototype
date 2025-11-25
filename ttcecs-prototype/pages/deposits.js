import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import DepositSchemes from '../components/DepositSchemes'
import FDCalculator from '../components/FDCalculator'

export default function Deposits() {
  return (
    <>
      <Head>
        <title>Deposits — Fixed Deposit Plans up to 14.40% | Thecos</title>
        <meta name="description" content="Thecos Fixed Deposit schemes with competitive interest rates up to 14.40% per annum. Safe, secure, and flexible investment options." />
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
                Deposit Schemes
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Secure your future with competitive interest rates up to <span className="font-black text-[#EA2E89]">14.40%</span> per annum
              </p>
            </motion.div>
          </div>
        </section>

        {/* Deposit Schemes Carousel */}
        <section className="py-16 px-6">
          <DepositSchemes />
        </section>

        {/* Why Choose Our FDs Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/10 to-[#27A9E1]/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">Why Choose Our Fixed Deposits?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '', title: 'Competitive Rates', desc: 'Interest rates up to 14.40% per annum' },
                { icon: '', title: 'Safe & Secure', desc: 'Strong cooperative backing with transparency' },
                { icon: '', title: 'Monthly Interest', desc: 'Interest credited directly to your bank account' },
                { icon: '🔄', title: 'Easy Renewal', desc: 'Flexible renewal facility on maturity' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all hover:scale-105"
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FD Calculator */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-8 text-center text-gray-900 dark:text-white">
              Calculate Your Returns
            </h2>
            <FDCalculator />
          </div>
        </section>

        {/* Policy Highlights Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#27A9E1]/10 to-[#EA2E89]/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-4xl font-black mb-8 text-gray-900 dark:text-white">Policy Highlights</h2>
              <div className="space-y-6">
                {[
                  { icon: '', title: 'FD Receipt Required', desc: 'Original FD receipt must be submitted for maturity withdrawal' },
                  { icon: '🔄', title: 'Renewal Process', desc: 'Application for renewal must be made before maturity date' },
                  { icon: '⏰', title: 'Grace Period', desc: 'Up to 30 days renewal grace period (subject to board approval)' },
                  { icon: '❌', title: 'Pre-Closure Rules', desc: 'Some plans allow pre-closure, others don\'t - check your plan details' },
                  { icon: '', title: 'Interest Credit', desc: 'Interest is credited monthly to your registered bank account' },
                  { icon: '', title: 'Flexible Tenures', desc: 'Short-term and long-term options available (PMW, PNX, HXP, PM0, LTP)' }
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

        {/* How to Invest Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">How to Invest — Easy Steps</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                { step: '01', icon: '', title: 'Download Form', desc: 'Get the FD application form' },
                { step: '02', icon: '✍️', title: 'Fill Details', desc: 'Complete personal & deposit info' },
                { step: '03', icon: '⚙️', title: 'Choose Options', desc: 'Select tenure & payout preference' },
                { step: '04', icon: '', title: 'Submit Docs', desc: 'ID proof, address proof' },
                { step: '05', icon: '', title: 'Get Certificate', desc: 'Receive FD bond/certificate' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all text-center"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white font-black text-lg w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    {item.step}
                  </div>
                  <div className="mt-8">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item.desc}</p>
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
              <h2 className="text-4xl font-black mb-6 text-white">Start Investing Today</h2>
              <p className="text-xl text-white/90 mb-8">
                Secure your financial future with Thecos Fixed Deposits
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
