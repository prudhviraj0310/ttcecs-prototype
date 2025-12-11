import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function News() {
  const newsItems = [
    {
      id: 1,
      category: 'Annual Report',
      title: 'FY 2024-25 Annual Report Published',
      excerpt: 'THECOS annual report for fiscal year 2024-25 is now available. The society achieved record growth with ₹550+ crore in total assets and maintained strong financial health.',
      icon: '📊',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      category: 'Policy Update',
      title: 'Enhanced Interest Rates on Fixed Deposits',
      excerpt: 'New FD interest rates effective from November 1, 2024. Premium plans now offering up to 14.40% per annum. Existing members can opt for renewal at revised rates.',
      icon: '',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      category: 'AGM Notice',
      title: 'Annual General Meeting - December 2024',
      excerpt: 'The 33rd Annual General Meeting will be held on December 28, 2024, at 10:00 AM at Amma Arangam. All members are requested to attend.',
      icon: '',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 4,
      category: 'Annual Report',
      title: 'FY 2023-24 Annual Report Published',
      excerpt: 'THECOS annual report for fiscal year 2023-24 is now available. The society achieved record growth with ₹500+ crore in total assets and maintained strong financial health.',
      icon: '',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      category: 'New Service',
      title: 'THECOS Mobile App Coming Soon',
      date: '10 October 2024',
      excerpt: 'We are excited to announce the upcoming launch of the THECOS mobile app. Members will soon be able to manage deposits, apply for loans, and track transactions on-the-go.',
      icon: '📱',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 6,
      category: 'Community',
      title: 'Tempz Hospital Expansion Completed',
      date: '5 October 2024',
      excerpt: 'Our subsidiary, Tempz Hospital, has completed a major expansion adding 50 new beds, advanced diagnostic equipment, and specialized treatment facilities for members.',
      icon: '',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 7,
      category: 'Achievement',
      title: 'THECOS Recognized as Best Co-operative Society',
      date: '20 September 2024',
      excerpt: 'THECOS has been awarded the "Best Multi-State Co-operative Society" by the National Co-operative Union of India for excellence in member services and governance.',
      icon: '',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 8,
      category: 'Education',
      title: 'Thiruvalluvar Vidhyashram Achieves 100% Pass Rate',
      date: '15 September 2024',
      excerpt: 'Our CBSE school, Thiruvalluvar Vidhyashram, celebrated 100% pass rate in Class 12 board exams with 25 students scoring above 95%. Scholarship program announced for toppers.',
      icon: '🎓',
      color: 'from-teal-500 to-green-500'
    }
  ]

  return (
    <>
      <Head>
        <title>News & Announcements — THECOS Updates</title>
        <meta name="description" content="Stay updated with THECOS news, announcements, election notices, AGM updates, and community events." />
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
                News & Announcements
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Stay informed with the latest updates, events, and notices from THECOS
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured News Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl overflow-hidden mb-12"
            >
              <div className={`bg-gradient-to-r ${newsItems[0].color} p-8 md:p-12`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold">
                    {newsItems[0].category}
                  </span>

                </div>
                <div className="flex items-start gap-6">
                  <div className="text-7xl">{newsItems[0].icon}</div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{newsItems[0].title}</h2>
                    <p className="text-xl text-white/90 mb-6">{newsItems[0].excerpt}</p>
                    <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:shadow-lg transition-all">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* All News Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.slice(1).map((news, idx) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
                >
                  <div className={`bg-gradient-to-r ${news.color} p-6`}>
                    <div className="text-6xl mb-4">{news.icon}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">

                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-[#27A9E1] transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">{news.excerpt}</p>
                    <button className="text-[#27A9E1] font-bold hover:underline flex items-center gap-2">
                      <span>Read More</span>
                      <span>→</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/10 to-[#27A9E1]/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <div className="text-6xl mb-6">📬</div>
              <h2 className="text-4xl font-black mb-6 text-gray-900 dark:text-white">Stay Updated</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Subscribe to our newsletter to receive the latest news, announcements, and updates directly in your inbox
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  const message = `*Newsletter Subscription Request*
                  
I would like to subscribe to the THECOS newsletter.
*Email:* ${email}`;
                  const whatsappUrl = `https://wa.me/919150070311?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              >
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2942] text-gray-900 dark:text-white focus:outline-none focus:border-[#27A9E1] transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Categories Filter (Optional Enhancement) */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black mb-8 text-center text-gray-900 dark:text-white">Browse by Category</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {['All', 'Election', 'Policy Update', 'AGM Notice', 'Achievement', 'Community', 'Education'].map((cat, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white dark:bg-[#0f1f3a] text-gray-900 dark:text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:bg-gradient-to-r hover:from-[#EA2E89] hover:to-[#27A9E1] hover:text-white"
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
