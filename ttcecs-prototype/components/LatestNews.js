import { motion } from 'framer-motion'
import { useState } from 'react'
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
    file: '/election/FINAL LIST OF DELEGATES.pdf',
    type: 'pdf',
    desc: 'Final List Of Delegates Published by ARO'
  },
  {
    title: 'DELEGATE LIST',
    date: '31/03/2025',
    file: '/election/SMALLER GB LIST.pdf',
    type: 'pdf',
    desc: 'Delegate list as on 31/03/2025'
  },
  {
    title: 'NEWS PAPPER - GENERAL NOTICE(BODs ELECTION 2025)',
    date: '19/10/2025',
    file: '#', // File missing in provided assets
    type: 'image',
    desc: 'News published in The Hindu news papper on 19/10/2025'
  },
  {
    title: 'ELECTION GENERAL NOTICE',
    date: '14/10/2025',
    file: '/election/ELECTION GENERAL ASSEMBLY NOTICE.pdf',
    type: 'pdf',
    desc: 'Election general notice signed by ARO on 14/10/2025'
  },
  {
    title: 'NOTICE OF MEETING',
    date: '14/10/2025',
    file: '/election/Notice of Meeting.pdf',
    type: 'pdf',
    desc: 'Notice of meeting signed by ARO on 14/10/2025'
  },
  {
    title: 'APPOINTMENT OF "RETURNING OFFICER" AND THE "ELECTION PROGRAMME"',
    date: '08/05/2025',
    file: '/election/681dd8da40004_thiruvalluvar20250509_15500874 (1).pdf',
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
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/5 to-[#27A9E1]/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">
              Latest News & Announcements
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Board of Directors Election 2025 - Important Updates
            </p>
          </motion.div>
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
    </section>
  )
}
