import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const newsItems = [
    {
      id: 1,
      category: 'Election',
      title: 'Board of Directors Election 2024 - Nomination Open',
      date: '20 Nov 2024',
      icon: '',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      category: 'Annual Report',
      title: 'FY 2023-24 Annual Report Published',
      date: '15 Nov 2024',
      icon: '',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      category: 'Policy Update',
      title: 'Enhanced Interest Rates on Fixed Deposits',
      date: '1 Nov 2024',
      icon: '',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      category: 'AGM Notice',
      title: 'Annual General Meeting - December 2024',
      date: '25 Oct 2024',
      icon: '',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 5,
      category: 'Achievement',
      title: 'Thecos Recognized as Best Co-operative Society',
      date: '20 Sep 2024',
      icon: '',
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

        {/* Carousel */}
        <div className="relative overflow-hidden">
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
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1]'
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to news item ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden mt-6 text-center">
          <Link href="/news">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white rounded-xl font-bold shadow-lg"
            >
              View All News →
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}
