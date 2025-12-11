'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const notifications = [
    {
        title: 'Form 19M - The List of Elected Directors as per approval from cooperative election authority new delhi.',
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

export default function ElectionNotification({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-brand-teal dark:text-white uppercase tracking-tight">
                            Election Notifications 2025
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Thiruvalluvar Transport Corporation Employees' Co-operative Credit Society Ltd.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    <div className="grid gap-4 md:grid-cols-2">
                        {notifications.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`group relative p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 flex items-start gap-4
                                    ${item.title.includes('CEA') ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:shadow-lg'}
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
                                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-teal dark:group-hover:text-brand-blue transition-colors text-sm md:text-base leading-tight">
                                            {item.title}
                                        </h3>
                                        {item.date && (
                                            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-1.5 py-0.5 rounded border border-gray-100 dark:border-gray-700 whitespace-nowrap ml-2">
                                                {item.date}
                                            </span>
                                        )}
                                    </div>

                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Footer Tip */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                    Click on any item to view or download the document
                </div>
            </motion.div>
        </div>
    );
}
