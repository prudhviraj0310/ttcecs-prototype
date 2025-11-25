import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import SmartCardDemo from '../components/SmartCardDemo'

export default function Membership() {
  return (
    <>
      <Head>
        <title>Membership — Join Thecos Today</title>
        <meta name="description" content="Become a Thecos member - Access exclusive low-interest loans, higher returns on deposits, and participation in society governance." />
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
                Become a Member
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Join Thecos and unlock exclusive benefits, competitive loans, and welfare support
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Become a Member Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">Why Become a Member?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '', title: 'Low-Interest Loans', desc: 'Access exclusive loan products at just 6.99% flat rate' },
                { icon: '', title: 'Higher Returns', desc: 'Fixed deposits up to 14.40% per annum' },
                { icon: '', title: 'Governance Rights', desc: 'Vote in elections and shape society decisions' },
                { icon: '', title: 'Welfare Benefits', desc: 'Healthcare, education through subsidiaries' }
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

        {/* Eligibility Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/10 to-[#27A9E1]/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-4xl font-black mb-8 text-gray-900 dark:text-white">Eligibility</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-5xl"></div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[#27A9E1]">Primary Members</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      Open to <strong>regular and permanent employees</strong> of State Express Transport Corporation (SETC), Tamil Nadu
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-5xl">👨‍👩‍👧‍👦</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[#27A9E1]">Nominees & Dependents</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      Family members and nominees can benefit from select schemes
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How to Join Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">How to Join — Simple Steps</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', icon: '', title: 'Fill Form', desc: 'Download and complete the membership application form' },
                { step: '02', icon: '', title: 'Submit Documents', desc: 'Employee ID, salary slip, Aadhar Card, PAN, SETC proof' },
                { step: '03', icon: '', title: 'Pay Share Capital', desc: 'Make the membership fee payment (if applicable)' },
                { step: '04', icon: '', title: 'Get Member Card', desc: 'Receive your Smart Card / QR Card for account access' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all"
                >
                  <div className="absolute -top-6 left-6 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white font-black text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
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

        {/* Smart Card Demo */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#27A9E1]/10 to-[#EA2E89]/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-8 text-center text-gray-900 dark:text-white">
              Your Member Smart Card
            </h2>
            <SmartCardDemo />
          </div>
        </section>

        {/* Member Benefits Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-4xl font-black mb-8 text-gray-900 dark:text-white">Member Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: '', title: 'Smart Card / QR Access', desc: 'Secure card to track accounts, deposits, and transactions' },
                  { icon: '', title: 'Dividend on Shares', desc: 'Annual dividends based on society performance (if applicable)' },
                  { icon: '', title: 'Voting Rights', desc: 'Participate in elections and Annual General Meetings' },
                  { icon: '', title: 'Welfare Programs', desc: 'Access to hospital, school, and community services' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-[#1a2942] rounded-xl"
                  >
                    <div className="text-4xl">{item.icon}</div>
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

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] rounded-3xl shadow-2xl p-12"
            >
              <h2 className="text-4xl font-black mb-6 text-white">Ready to Join?</h2>
              <p className="text-xl text-white/90 mb-8">
                Start your journey with Thecos today and unlock a world of financial benefits
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
