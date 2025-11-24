// components/Globe.js
'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import the entire 3D globe scene with no SSR
const GlobeScene = dynamic(() => import('./GlobeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-electric mx-auto mb-4"></div>
        <p className="text-muted">Loading 3D Globe...</p>
      </div>
    </div>
  )
});

export default function Globe() {
  const [theme, setTheme] = useState('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
  const [activePin, setActivePin] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    { name: 'Anna Nagar (HQ)', members: '50,000+', address: 'No. 1735, 18th Main Road, Anna Nagar West, Chennai – 600040', phone: '+91 90259 47007' },
    { name: 'T Nagar', members: '25,000+', address: 'T. Nagar Branch, Chennai', phone: '+91 63834 02323' },
    { name: 'Kilambakkam', members: '15,000+', address: 'Kilambakkam Branch, Chennai', phone: '+91 99404 09355' },
    { name: 'Nanganallur', members: '12,000+', address: 'Nanganallur Branch, Chennai', phone: '+91 91500 70313' },
    { name: 'Coimbatore', members: '18,000+', address: 'Coimbatore Branch, Tamil Nadu', phone: '+91 87787 95546' },
    { name: 'Nagercoil', members: '5,000+', address: 'Nagercoil Branch, Tamil Nadu', phone: '+91 87547 61657' },
  ];

  const handlePinClick = (location) => {
    setActivePin(location);
    setSelectedLocation(location);
  };

  return (
    <section id="globe" className={`py-24 ${isDark ? "bg-[#071428]" : "bg-[#F5FAFF]"} relative overflow-hidden`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">Our Network</h2>
          <p className="text-muted mt-4 text-lg">
            Serving transport employees across multiple branches
          </p>
        </div>

        {/* 3D Globe with interactive pins */}
        {isMounted && (
          <div className="h-[600px] rounded-2xl overflow-hidden glass relative mb-8">
            <GlobeScene onPinClick={handlePinClick} activePin={activePin} />

            {/* Interactive info panel */}
            <AnimatePresence>
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute top-4 right-4 glass p-6 rounded-xl max-w-xs shadow-2xl"
                >
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="absolute top-2 right-2 text-muted hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                  <h3 className="text-xl font-bold text-electric">{selectedLocation.name}</h3>
                  <p className="text-sm text-muted mt-2">{selectedLocation.address}</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-2xl font-bold">{selectedLocation.members}</div>
                    <div className="text-xs text-muted">Active Members</div>
                  </div>
                  <a href="/contact" className="mt-4 w-full bg-electric text-[#00121a] py-2 rounded-md font-semibold text-sm block text-center hover:bg-electric/90 transition-colors">
                    Visit Branch
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Location legend */}
            <div className="absolute bottom-4 left-4 glass p-4 rounded-lg space-y-2 text-sm max-w-xs">
              <div className="font-bold mb-3 text-electric">Select a Location</div>
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => handlePinClick(loc)}
                  className={`flex items-center gap-2 w-full text-left p-2 rounded transition ${
                    activePin?.name === loc.name ? 'bg-electric/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activePin?.name === loc.name ? 'bg-green-400 animate-pulse' : 'bg-electric animate-pulse'
                  }`} />
                  <div className="flex-1">
                    <div className="font-semibold">{loc.name}</div>
                    <div className="text-xs text-muted">{loc.members} members</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Branch info cards below globe */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="glass p-6 rounded-xl text-center hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => handlePinClick(loc)}
            >
              <div className="text-5xl mb-3">📍</div>
              <h3 className="font-bold text-xl text-electric">{loc.name}</h3>
              <p className="text-xs text-muted mt-2 mb-4">{loc.address}</p>
              <div className="border-t border-white/10 pt-4 mb-4">
                <p className="text-3xl font-black text-electric">{loc.members}</p>
                <p className="text-xs text-muted mt-1">Active Members</p>
              </div>
              <a 
                href="/contact" 
                className="w-full bg-electric/10 hover:bg-electric/20 py-2 px-4 rounded-md text-sm transition block text-center font-semibold"
                onClick={(e) => e.stopPropagation()}
              >
                View on Map
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
