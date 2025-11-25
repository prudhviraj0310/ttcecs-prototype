import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'Membership',
      questions: [
        {
          q: 'Who is eligible to become a member?',
          a: 'Regular and permanent employees of SETC (State Express Transport Corporation), Tamil Nadu, can join. Dependents and nominees may benefit from certain schemes.'
        },
        {
          q: 'How can I join Thecos?',
          a: 'Download the membership form from our Downloads page, fill in your details, attach proof of SETC employment (Employee ID, salary slip, Aadhar Card, PAN), and pay the membership share capital.'
        },
        {
          q: 'What documents are needed for membership?',
          a: 'You need: Employee ID, salary slip, proof of SETC employment, Aadhar Card, PAN card, and membership form duly filled.'
        },
        {
          q: 'Do I get a membership card?',
          a: 'Yes! Once approved, you will receive a Member Smart Card / QR Card that can be used to track your account, deposits, and transactions.'
        }
      ]
    },
    {
      category: 'Deposits',
      questions: [
        {
          q: 'What are the interest rates for fixed deposits?',
          a: 'We offer competitive interest rates up to 14.40% per annum, depending on the deposit scheme and tenure you choose.'
        },
        {
          q: 'Can I pre-close my fixed deposit?',
          a: 'It depends on the FD plan. Some plans allow pre-closure with specific rules, while others (like LTP) do not. Check your specific plan details.'
        },
        {
          q: 'How is the interest paid?',
          a: 'Interest is credited monthly directly to your registered bank account.'
        },
        {
          q: 'What is the minimum deposit amount?',
          a: 'The minimum deposit varies by scheme. For example, Fixed Deposits start from ₹500 and Recurring Deposits from ₹100 per month.'
        },
        {
          q: 'Can I renew my FD after maturity?',
          a: 'Yes! Application for renewal must be made before the maturity date. A grace period of up to 30 days may be allowed, subject to board approval.'
        }
      ]
    },
    {
      category: 'Loans',
      questions: [
        {
          q: 'What are the interest rates for loans?',
          a: 'We offer a competitive flat rate of 6.99% per annum on all loan products (except Marriage Advance, which is interest-free).'
        },
        {
          q: 'What types of loans are available?',
          a: 'We offer: Surety Loan (salary-based), Gold Loan (against gold ornaments), Consumer Loan (up to ₹1 lakh for household goods), and Marriage Advance (₹1 lakh, interest-free).'
        },
        {
          q: 'How many sureties do I need for a loan?',
          a: 'Most loans require sureties or nominees. For loans above ₹5 lakh, 2 sureties are required.'
        },
        {
          q: 'What documents are needed for a surety loan?',
          a: 'You need: Loan application form, promissory note, two sureties (if required), salary slip, NOC from Pay Disbursing Officer, ID proof, and address proof.'
        },
        {
          q: 'When is the EMI due each month?',
          a: 'EMI is due on the 5th of every month. A 4% penalty is charged on overdue EMI amounts.'
        },
        {
          q: 'What is the minimum loan tenure?',
          a: 'The minimum repayment tenure is 24 months. This may vary for FD-backed loans.'
        }
      ]
    },
    {
      category: 'General',
      questions: [
        {
          q: 'What are the society\'s registration details?',
          a: 'Thecos is registered under the Multi-State Co-operative Societies Act, 2002. Registration: MSCS/CR/16-91. GSTIN: 33AAIAT2044E1ZU. LEI: 3358004B6E98BGWE1P16.'
        },
        {
          q: 'How is Thecos governed?',
          a: 'The society is governed by a Board of Directors, elected regularly by members. We publish election notices, delegate lists, and AGM reports for full transparency.'
        },
        {
          q: 'Where is the head office located?',
          a: 'Head Office: No. 1735, 18th Main Road, Anna Nagar West, Chennai – 600040.'
        },
        {
          q: 'How can I contact Thecos?',
          a: 'Call us at +91 90259 47007 (Anna Nagar Head Office), email support@thecos.com, or visit any of our branches in Chennai, Nagercoil, and Coimbatore.'
        },
        {
          q: 'What subsidiaries does Thecos have?',
          a: 'We have four subsidiaries: Tempz Academy & Medical Charitable Foundation (healthcare), Oblong Realties Pvt. Ltd. (real estate), Thiruvalluvar Vidhyashram (CBSE school), and Zajasol HR Solutions Pvt. Ltd. (recruitment).'
        }
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>FAQs — Frequently Asked Questions | Thecos</title>
        <meta name="description" content="Find answers to common questions about Thecos membership, deposits, loans, and services." />
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
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Find answers to common questions about our services
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <h2 className="text-3xl font-black mb-6 text-gray-900 dark:text-white">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIdx) => {
                    const globalIdx = catIdx * 100 + faqIdx
                    const isOpen = openIndex === globalIdx
                    
                    return (
                      <motion.div
                        key={faqIdx}
                        className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-lg overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-[#1a2942] transition-colors"
                        >
                          <span className="font-bold text-lg text-gray-900 dark:text-white pr-4">{faq.q}</span>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-3xl text-[#27A9E1] flex-shrink-0"
                          >
                            ▼
                          </motion.span>
                        </button>
                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-gray-700 dark:text-gray-300">
                            {faq.a}
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] rounded-3xl shadow-2xl p-12"
            >
              <h2 className="text-4xl font-black mb-6 text-white">Still Have Questions?</h2>
              <p className="text-xl text-white/90 mb-8">
                Our team is here to help you with any queries
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
                  href="https://wa.me/919150070311"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span></span>
                  <span>WhatsApp Us</span>
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
