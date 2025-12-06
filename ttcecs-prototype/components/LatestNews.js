import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const notifications = [
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
    // Removed obsolete "Board of Directors Election 2024" item
    {
      id: 2,
      category: 'Annual Report',
      title: 'FY 2023-24 Annual Report Published',
      date: '15 Nov 2024',
      icon: '📊',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      category: 'Policy Update',
      title: 'Enhanced Interest Rates on Fixed Deposits',
      date: '1 Nov 2024',
      icon: '📈',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      category: 'AGM Notice',
      title: 'Annual General Meeting - December 2024',
      date: '25 Oct 2024',
      icon: '🤝',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 5,
      category: 'Achievement',
      title: 'THECOS Recognized as Best Co-operative Society',
      date: '20 Sep 2024',
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
                      <span className="text-white/80 text-sm">{news.date}</span>
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
        <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-12">
            <div className="text-left">
              <h3 className="text-sm md:text-base font-bold text-brand-gray dark:text-gray-400 uppercase tracking-widest mb-2">
                THIRUVALLUVAR TRANSPORT CORPORATION EMPLOYEES' CO-OPERATIVE CREDIT SOCIETY LIMITED
              </h3>
              <h2 className="text-3xl md:text-4xl font-black text-brand-teal dark:text-white uppercase tracking-tight">
                BOARD OF DIRECTORS ELECTION 2025
              </h2>
            </div>
            <div className="hidden md:block">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-bold animate-pulse">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                Live Updates
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {notifications.map((item, index) => (
              <motion.a
                key={index}
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group relative p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 flex items-start gap-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg
                  ${item.title.includes('CEA') ? 'border-l-4 border-l-blue-500' : ''}
                `}
              >
                <div className={`p-3 rounded-lg shrink-0 ${item.title.includes('CEA') ? 'bg-blue-100 text-blue-600' : 'bg-brand-teal/10 text-brand-teal dark:bg-brand-blue/20 dark:text-brand-blue'}`}>
                  {item.type === 'pdf' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                  {item.type === 'image' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {item.type === 'link' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-teal dark:group-hover:text-brand-blue transition-colors text-lg leading-tight">
                      {item.title}
                    </h3>
                    {item.date && (
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap ml-2">
                        {item.date}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
