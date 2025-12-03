import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — TTCECS | Since 1991</title>
        <meta name="description" content="Thiruvalluvar Transport Employees’ Co-operative Credit Society Ltd. (TTCECS) - Serving transport employees since 1991 with trust and transparency." />
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
                About TTCECS
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Trusted financial institution serving transport employees since 1991.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Identity Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-4xl font-black mb-6 text-gray-900 dark:text-white">Our Identity</h2>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <p>
                  <strong className="text-[#EA2E89]">Thiruvalluvar Transport Employees' Co-operative Credit Society Ltd. (TTCECS)</strong>
                </p>
                <p>
                  Established in 1991, TTCECS is a trusted financial institution serving the economic needs of transport employees across Tamil Nadu. Built on principles of transparency, mutual assistance, and community upliftment, TTCECS offers safe, reliable, and accessible financial services.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8 p-6 bg-gray-50 dark:bg-[#1a2942] rounded-2xl">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Registration</p>
                    <p className="font-bold">10 July 1991</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Act</p>
                    <p className="font-bold">Multi-State Co-operative Societies Act, 2002</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Head Office</p>
                    <p className="font-bold">No. 1735, 18th Main Road, Anna Nagar West, Chennai – 600040</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Legal Status</p>
                    <p className="font-bold">Registered Society</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/10 to-[#27A9E1]/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: '💰',
                  title: 'Savings & Deposit Schemes',
                  desc: 'Fixed deposits, recurring deposits, and specially designed savings programs.'
                },
                {
                  icon: '💳',
                  title: 'Loan Facilities',
                  desc: 'Personal, education, emergency, and other essential loan products.'
                },
                {
                  icon: '🤝',
                  title: 'Member Welfare & Support',
                  desc: 'Financial guidance, welfare initiatives, and assistance programs for employees.'
                },
                {
                  icon: '📱',
                  title: 'Digital Services',
                  desc: 'Online fund transfers, mobile app support, WhatsApp communication, and SMS notifications.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-8 flex items-start gap-6"
                >
                  <div className="text-5xl bg-gray-100 dark:bg-[#1a2942] p-4 rounded-2xl">{item.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why TTCECS Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">Why TTCECS?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Strong Legacy', desc: 'Serving members with trust since 1991' },
                { title: 'Transparent Governance', desc: 'Accountable and member-driven operations' },
                { title: 'Financial Discipline', desc: 'Safe operations backed by strong management' },
                { title: 'Member-Friendly', desc: 'Fast and accessible financial services' },
                { title: 'Community Welfare', desc: 'Commitment to employee wellbeing' },
                { title: 'Modern Access', desc: 'Digital tools for easy transactions' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-lg p-8 text-center border-b-4 border-[#27A9E1]"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
