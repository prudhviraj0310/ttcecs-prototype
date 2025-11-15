// components/DepositSchemes.js
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const schemes = [
  {
    id: 'fd',
    name: 'Fixed Deposit (FD)',
    icon: '💰',
    minAmount: '₹500',
    rate: '14.40%',
    tenure: '1 to 10 years',
    color: 'from-blue-500 to-purple-600',
    features: [
      'Minimum deposit: ₹500',
      'Interest rate: 14.40% per annum',
      'Quarterly compounding',
      'Tenure: 1 to 10 years',
      'Loan facility available',
      'Premature withdrawal allowed'
    ],
    description: 'Secure your future with guaranteed high returns'
  },
  {
    id: 'rd',
    name: 'Recurring Deposit (RD)',
    icon: '�',
    minAmount: '₹100/month',
    rate: '14.40%',
    tenure: '1 to 10 years',
    color: 'from-green-500 to-teal-600',
    features: [
      'Monthly deposit: ₹100 onwards',
      'Interest rate: 14.40% per annum',
      'Flexible tenure: 1-10 years',
      'Disciplined savings habit',
      'Loan facility available',
      'Perfect for regular income earners'
    ],
    description: 'Build wealth systematically with monthly savings'
  },
  {
    id: 'dmg',
    name: 'DMG (Diamond)',
    icon: '💎',
    minAmount: '₹500',
    rate: '14.40%',
    tenure: 'Age 0-12 years',
    color: 'from-blue-400 to-indigo-600',
    features: [
      'Age group: 0-12 years',
      'Minor accounts',
      'Guardian operated',
      'Education focused savings',
      'Same FD/RD benefits',
      'Future planning for children'
    ],
    description: 'Perfect start for your child\'s financial future'
  },
  {
    id: 'gnx',
    name: 'GNX (Gold Next)',
    icon: '🥇',
    minAmount: '₹500',
    rate: '14.40%',
    tenure: 'Age 13-18 years',
    color: 'from-yellow-500 to-orange-600',
    features: [
      'Age group: 13-18 years',
      'Teen accounts',
      'Partial self-operation',
      'Higher education goals',
      'All FD/RD facilities',
      'Financial literacy building'
    ],
    description: 'Growing wealth for growing minds'
  },
  {
    id: 'frontiers',
    name: 'Frontiers',
    icon: '🚀',
    minAmount: '₹500',
    rate: '14.40%',
    tenure: 'Age 19-35 years',
    color: 'from-green-400 to-emerald-600',
    features: [
      'Age group: 19-35 years',
      'Young professionals',
      'Marriage & house goals',
      'Loan eligibility up to 90%',
      'Smart Card access',
      'Complete banking facilities'
    ],
    description: 'Launch your financial independence'
  },
  {
    id: 'pioneers',
    name: 'Pioneers',
    icon: '⭐',
    minAmount: '₹500',
    rate: '14.40%',
    tenure: 'Age 36-55 years',
    color: 'from-indigo-500 to-blue-600',
    features: [
      'Age group: 36-55 years',
      'Prime earning years',
      'Wealth accumulation',
      'Retirement planning',
      'Premium loan services',
      'Investment counseling'
    ],
    description: 'Build your legacy with confidence'
  },
  {
    id: 'ssnr',
    name: 'SSNR (Senior)',
    icon: '👑',
    minAmount: '₹500',
    rate: '14.40%',
    tenure: 'Age 56+ years',
    color: 'from-red-500 to-pink-600',
    features: [
      'Age group: 56+ years',
      'Senior citizens special',
      'Retirement income support',
      'Priority services',
      'Health & welfare benefits',
      'Flexible withdrawal options'
    ],
    description: 'Secure your golden years with dignity'
  },
];

function SchemeCard({ scheme }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[420px] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 glass rounded-2xl p-8 flex flex-col items-center justify-center text-center backface-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`text-7xl mb-4 animate-bounce`}>{scheme.icon}</div>
          <h3 className="text-2xl font-bold mb-2">{scheme.name}</h3>
          <div className={`text-4xl font-black bg-gradient-to-r ${scheme.color} bg-clip-text text-transparent mb-3`}>
            {scheme.rate}
          </div>
          <div className="text-muted text-sm mb-2">{scheme.tenure}</div>
          <div className="text-electric text-xs font-semibold mb-3">{scheme.minAmount} onwards</div>
          <p className="text-sm text-muted/80 italic">{scheme.description}</p>
          <div className="mt-auto pt-6">
            <div className="text-xs text-electric animate-pulse">Click to see details →</div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 glass rounded-2xl p-8 flex flex-col backface-hidden bg-gradient-to-br ${scheme.color} bg-opacity-10`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-xl font-bold mb-4 text-center">{scheme.name} Features</h3>
          <ul className="space-y-3 flex-grow">
            {scheme.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-electric text-lg">✓</span>
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-white/10">
            <button className="w-full bg-electric/20 hover:bg-electric/30 py-3 rounded-lg font-semibold transition text-sm">
              Open {scheme.name} Account
            </button>
          </div>
          <div className="text-xs text-center text-muted mt-3">Click to flip back</div>
        </div>
      </motion.div>
    </div>
  );
}

export default function DepositSchemes() {
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
  return (
    <section id="schemes" className={`py-24 ${isDark ? "bg-gradient-to-b from-[#071428] to-[#03121f]" : "bg-gradient-to-b from-white to-[#F5FAFF]"} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(39,169,225,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Fixed & Recurring Deposit Plans</h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            Choose from FD, RD, or age-specific deposit schemes. All offering 14.40% annual returns with quarterly compounding. Start with as low as ₹100/month for RD or ₹500 for FD.
          </p>
        </motion.div>

        {/* Desktop: Swiper Carousel */}
        <div className="hidden md:block">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: false,
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="py-8"
            style={{ padding: '40px 0' }}
          >
            {schemes.map((scheme) => (
              <SwiperSlide key={scheme.id} style={{ width: '350px' }}>
                <SchemeCard scheme={scheme} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile: Grid */}
        <div className="md:hidden grid grid-cols-1 gap-6">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass p-6 rounded-xl text-center"
        >
          <p className="text-sm text-muted">
            🏆 All schemes offer 14.40% annual returns with quarterly compounding.
            <span className="text-electric font-semibold"> FD from ₹500 | RD from ₹100/month | Loan facility available | Premature withdrawal allowed</span>
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #00d9ff !important;
          background: rgba(7, 20, 40, 0.8);
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
        .swiper-pagination-bullet {
          background: #00d9ff !important;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
