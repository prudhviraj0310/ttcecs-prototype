import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — Thecos | Since 1991</title>
        <meta name="description" content="Learn about Thecos - Founded in 1991, serving SETC employees with trust, transparency, and strong governance." />
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
                About Thecos
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Empowering Members Since 1991
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
                  <strong className="text-[#EA2E89]">Thiruvalluvar Transport Corporation Employees' Co-operative Credit Society Ltd. (Thecos)</strong>
                </p>
                <p>
                  Registered under the <strong>Multi-State Co-operative Societies Act, 2002</strong>
                </p>
                <p>
                  <strong>Registration:</strong> MSCS/CR/16-91
                </p>
                <p>
                  <strong>Head Office:</strong> No. 1735, 18th Main Road, Anna Nagar West, Chennai – 600040
                </p>
                <p>
                  <strong>GSTIN:</strong> 33AAIAT2044E1ZU
                </p>
                <p>
                  <strong>LEI:</strong> 3358004B6E98BGWE1P16 (Legal Entity Identifier)
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/10 to-[#27A9E1]/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-xl p-8"
              >
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">Our Vision</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  A financially secure and empowered community of SETC employees and their families.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-xl p-8"
              >
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">Our Mission</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  To cultivate savings, provide equitable loans, and drive welfare through a member-driven cooperative model.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our History Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-4xl font-black mb-6 text-gray-900 dark:text-white">Our History</h2>
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📅</div>
                  <div>
                    <p className="font-bold text-xl text-[#27A9E1] mb-2">Founded on 10 July 1991</p>
                    <p>
                      Thecos has proudly served SETC (State Express Transport Corporation) employees for more than three decades.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🤝</div>
                  <div>
                    <p>
                      Built by and run for SETC's workforce — committed to <strong>trust, transparency, and strong governance</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Governance Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#27A9E1]/10 to-[#EA2E89]/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-4xl font-black mb-6 text-gray-900 dark:text-white">Governance & Elections</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⚖️</div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <p>
                      The society is governed by a <strong>Board of Directors</strong>, elected regularly by its members.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📋</div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <p>
                      We publish election notices, delegate lists, and AGM reports to maintain full <strong>democratic transparency</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Values Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">Why Choose Thecos</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '💰', title: 'Low-Cost Loans', desc: 'Competitive loan interest rates for members' },
                { icon: '🔒', title: 'Secure Savings', desc: 'Fixed/Savings deposits with attractive returns' },
                { icon: '👥', title: 'Open Membership', desc: 'SETC employees and general public can join' },
                { icon: '🗳️', title: 'Democratic Governance', desc: 'Democratically elected Board of Directors' },
                { icon: '🏥', title: 'Welfare Support', desc: 'Education, healthcare through subsidiaries' },
                { icon: '✨', title: 'Member-First', desc: 'Built by members, for members' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
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
