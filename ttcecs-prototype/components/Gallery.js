// components/Gallery.js
'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const galleryItems = [
  {
    id: 1,
    title: 'Smart Card Launch Event',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600',
    description: 'Digital revolution in cooperative banking'
  },
  {
    id: 2,
    title: 'Member Yoga Session',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
    description: 'Holistic health programs for members'
  },
  {
    id: 3,
    title: 'Mobile App Launch',
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600',
    description: 'Banking at your fingertips'
  },
  {
    id: 4,
    title: 'Community Welfare Program',
    category: 'Social',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600',
    description: 'Giving back to our community'
  },
  {
    id: 5,
    title: 'Financial Literacy Workshop',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
    description: 'Empowering members with knowledge'
  },
  {
    id: 6,
    title: 'Branch Inauguration',
    category: 'Expansion',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    description: 'Growing our network across Tamil Nadu'
  },
];

export default function Gallery() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const getTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    };
    getTheme();
    const observer = new MutationObserver(getTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="gallery" className={`py-24 ${isDark ? "bg-gradient-to-b from-[#071428] to-[#03121f]" : "bg-gradient-to-b from-[#F5FAFF] to-white"} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(39,169,225,0.1)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Events & Community</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Celebrating milestones, empowering members, and building a stronger community together
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <div className="text-xs text-electric font-semibold mb-1 uppercase tracking-wide">
                        {item.category}
                      </div>
                      <p className="text-sm text-brand-teal">{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <span className="text-xs text-electric">{item.category}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full glass rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                width={1200}
                height={800}
                className="w-full h-auto"
                unoptimized
              />
              <div className="p-8">
                <div className="text-xs text-electric font-semibold mb-2 uppercase tracking-wide">
                  {selectedItem.category}
                </div>
                <h3 className="text-2xl font-bold mb-3">{selectedItem.title}</h3>
                <p className="text-muted">{selectedItem.description}</p>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="mt-6 px-6 py-2 bg-electric text-[#00121a] rounded-lg font-semibold hover:bg-electric/90 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
