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
    id: 'rd',
    name: 'Recurring Deposit (RD)',
    icon: '💰',
    minAmount: '₹1,000/month',
    rate: 'Up to 10%',
    tenure: '1 to 2 Years',
    color: 'from-purple-500 to-pink-600',
    features: [
      '1 Year Tenure: 8% Interest',
      '2 Years Tenure: 10% Interest',
      'Min Deposit: ₹1,000/month',
      'Safe & Secure Returns',
      'Flexible Savings Option'
    ],
    description: 'Start small, grow steadily with monthly savings'
  },
  {
    id: 'dmg',
    name: 'DMG (Minors)',
    icon: '🔵',
    minAmount: '₹5,00,000',
    rate: '14.40%',
    tenure: 'Below 18 Years',
    color: 'from-blue-400 to-indigo-600',
    features: [
      'Eligible for: LTP Only',
      'Min Amount: ₹5,00,000',
      'Tenure: 5 Years',
      'Interest: 14.40% (Cumulative)',
      'No Monthly Payout',
      'Example: ₹5L → ₹8.6L (5 yrs)'
    ],
    description: 'Long Term Progressive Deposit for Minors'
  },
  {
    id: 'gnx',
    name: 'GNX (18-30 yrs)',
    icon: '🟢',
    minAmount: 'Varies',
    rate: 'Up to 14.40%',
    tenure: '18 to 30 Years',
    color: 'from-green-500 to-teal-600',
    features: [
      'PMW: 10.75% M / 11.19% C',
      'PMO: 11.50% M / 12.00% C',
      'LTP: 14.40% Cumulative (5yr)',
      'PNX (Single Mom): 11.25% M',
      'HXP (Diff Abled): 11.00% M'
    ],
    description: 'Flexible options for Young Adults'
  },
  {
    id: 'frontiers',
    name: 'Frontiers (31-57 yrs)',
    icon: '🟡',
    minAmount: 'Varies',
    rate: 'Up to 14.40%',
    tenure: '31 to 57 Years',
    color: 'from-yellow-500 to-orange-600',
    features: [
      'PMW: 10.50% M / 10.92% C',
      'PMO: 11.25% M / 11.73% C',
      'LTP: 14.40% Cumulative (5yr)',
      'PNX (Single Mom): 11.25% M',
      'HXP (Diff Abled): 11.00% M'
    ],
    description: 'Growth plans for Working Professionals'
  },
  {
    id: 'pioneers',
    name: 'Pioneers (58-79 yrs)',
    icon: '🟠',
    minAmount: 'Varies',
    rate: 'Up to 14.40%',
    tenure: '58 to 79 Years',
    color: 'from-orange-500 to-red-600',
    features: [
      'PMW: 11.00% M / 11.46% C',
      'PMO: 11.75% M / 12.28% C',
      'LTP: 14.40% Cumulative (5yr)',
      'PNX (Single Mom): 11.25% M',
      'HXP (Diff Abled): 11.00% M'
    ],
    description: 'Secure returns for Senior Citizens'
  },
  {
    id: 'ssnr',
    name: 'SSNR (80+ yrs)',
    icon: '🔴',
    minAmount: 'Varies',
    rate: 'Up to 14.40%',
    tenure: '80+ Years',
    color: 'from-red-600 to-rose-700',
    features: [
      'PMW: 11.25% M / 11.73% C',
      'PMO: 12.00% M / 12.55% C',
      'LTP: 14.40% Cumulative (5yr)',
      'PNX (Single Mom): 11.25% M',
      'HXP (Diff Abled): 11.00% M'
    ],
    description: 'Highest returns for Super Seniors'
  }
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
            All schemes offer 14.40% annual returns with quarterly compounding.
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
