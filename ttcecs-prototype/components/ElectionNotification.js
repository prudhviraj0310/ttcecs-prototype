'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const notifications = []; // Removed hardcoded data

export default function ElectionNotification({ isOpen, onClose }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch notifications when modal opens
    if (isOpen && !loading && notifications.length === 0) {
        setLoading(true);
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                if (data.electionNotifications) {
                    setNotifications(data.electionNotifications);
                }
            })
            .catch(err => console.error('Error fetching notifications:', err))
            .finally(() => setLoading(false));
    }

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
                                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-teal dark:group-hover:text-brand-blue transition-colors text-sm md:text-base leading-tight uppercase">
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
