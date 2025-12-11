import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const notifications = [
  {
    title: 'APPROVAL OF BOARD MEMBERS RESULT',
    date: '11/12/2025',
    file: '/election/APPROVAL_OF_BOARD_MEMBERS.pdf',
    type: 'pdf',
    desc: 'Convey the approval of Board Members result'
  },
  {
    title: 'APPROVAL FOR APPOINTMENT OF ARO',
    date: '11/12/2025',
    file: '/election/APPROVAL_OF_ARO.pdf',
    type: 'pdf',
    desc: 'Approval for appointment of ARO'
  },
  {
    title: 'FINAL LIST OF CONTESTING CANDIDATE',
    date: '26/11/2025',
    file: '/election/PHOTO-2025-12-06-18-48-29.jpg',
    type: 'image',
    desc: 'FINAL LIST OF CONTESTING CANDIDATE Published by ARO'
  },
  {
    title: 'LIST OF VALID NOMINATIONS',
    date: '25/11/2025',
    file: '/election/PHOTO-2025-12-06-18-48-26.jpg',
    type: 'image',
    desc: 'LIST OF VALID NOMINATIONS Published by ARO'
  },
  {
    title: 'NOMINATION FORMS RECEIVED',
    date: '24/11/2025',
    file: '/election/PHOTO-2025-12-06-18-48-25.jpg',
    type: 'image',
    desc: 'NOMINATION FORMS RECEIVED BY THE RETURNING OFFICER / ASSISTANT RETURNING OFFICER'
  },
  {
    title: 'FINAL LIST OF DELEGATES',
    date: '13/11/2025',
    file: '/election/FINAL%20LIST%20OF%20DELEGATES.pdf',
    type: 'pdf',
    desc: 'Final List Of Delegates Published by ARO'
  },
  {
    title: 'DELEGATE LIST',
    date: '31/03/2025',
    file: '/election/SMALLER%20GB%20LIST.pdf',
    type: 'pdf',
    desc: 'Delegate list as on 31/03/2025'
  },
  {
    title: 'NEWS PAPPER - GENERAL NOTICE(BODs ELECTION 2025)',
    date: '19/10/2025',
    file: '/election/ELECTION%20GENERAL%20ASSEMBLY%20NOTICE.pdf', // Fallback to General Notice PDF as image is missing
    type: 'pdf',
    desc: 'News published in The Hindu news papper on 19/10/2025'
  },
  {
    title: 'ELECTION GENERAL NOTICE',
    date: '14/10/2025',
    file: '/election/ELECTION%20GENERAL%20ASSEMBLY%20NOTICE.pdf',
    type: 'pdf',
    desc: 'Election general notice signed by ARO on 14/10/2025'
  },
  {
    title: 'NOTICE OF MEETING',
    date: '14/10/2025',
    file: '/election/Notice%20of%20Meeting.pdf',
    type: 'pdf',
    desc: 'Notice of meeting signed by ARO on 14/10/2025'
  },
  {
    title: 'APPOINTMENT OF "RETURNING OFFICER" AND THE "ELECTION PROGRAMME"',
    date: '08/05/2025',
    file: '/election/681dd8da40004_thiruvalluvar20250509_15500874%20(1).pdf',
    type: 'pdf',
    desc: 'Election No.35/2025/26'
  },
  {
    title: 'CO-OPERATIVE ELECTION AUTHORITY (CEA)',
    date: '04/08/2023',
    file: 'https://crcs.gov.in/about-cea',
    type: 'link',
    desc: 'The amended Act the Multi State Co-operative Societies (Amendment) Act, 2023...'
  }
];

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const newsItems = [
    {
      id: 1,
      category: 'Annual Report',
      title: 'FY 2024-25 Annual Report Published',
      icon: '📊',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      category: 'Annual Report',
      title: 'FY 2023-24 Annual Report Published',
      icon: '📈',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      category: 'Policy Update',
      title: 'Enhanced Interest Rates on Fixed Deposits',
      icon: '💎',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      category: 'AGM Notice',
      title: 'Annual General Meeting - December 2024',
      icon: '🤝',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 5,
      category: 'Achievement',
      title: 'THECOS Recognized as Best Co-operative Society',
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [newsItems.length])

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/5 to-[#27A9E1]/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">
              Latest News & Announcements
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Stay updated with board notices, election updates, and policy changes
            </p>
          </motion.div>
          <Link href="/news">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-3 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              View All News →
            </motion.button>
          </Link>
        </div>

        {/* 1. Carousel Section */}
        <div className="relative overflow-hidden mb-16">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {newsItems.map((news, idx) => (
              <div key={news.id} className="w-full flex-shrink-0 px-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${news.color} p-8 md:p-12`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold">
                        {news.category}
                      </span>

                    </div>
                    <div className="flex items-start gap-6">
                      <div className="text-7xl hidden md:block">{news.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                          {news.title}
                        </h3>
                        <Link href="/news">
                          <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:shadow-lg transition-all inline-flex items-center gap-2">
                            <span>Read More</span>
                            <span>→</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {newsItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-2 rounded-full transition-all ${idx === currentIndex
                  ? 'w-8 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1]'
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
                  }`}
                aria-label={`Go to news item ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2. Election Notification Grid */}
        {/* 2. Election Notification Grid - Section Removed and moved to Modal in Header */}
      </div>
    </section>
  )
}
