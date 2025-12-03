// components/AssociatedOrgs.js
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const organizations = [
  {
    id: 'tempz',
    name: 'Tempz Hospital',
    icon: '🏥',
    tagline: '24×7 Multispeciality Care',
    frontDescription: 'Accessible, ethical, and patient-centred medical care',
    backDescription: 'Comprehensive healthcare facility offering modern treatment, diagnostics, and wellness programs for THECOS members and families.',
    services: ['24/7 Emergency Care', 'Specialized Departments', 'Diagnostic Lab', 'Preventive Health Checkups'],
    ctaText: 'Book Appointment',
    ctaLink: '/subsidiaries',
    gradient: 'from-red-500 to-pink-600'
  },
  {
    id: 'oblong',
    name: 'Oblong Realties',
    icon: '🏘️',
    tagline: 'Real Estate & Asset Development',
    frontDescription: 'Building a strong and future-ready infrastructure base',
    backDescription: 'Helping members invest in quality residential and commercial properties with legal assurance and competitive pricing.',
    services: ['Property Consultation', 'Legal Documentation', 'Home Loans Assistance', 'Site Verification'],
    ctaText: 'View Properties',
    ctaLink: '/subsidiaries',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'vidhyashram',
    name: 'Thiruvalluvar Vidhyashram',
    icon: '🎓',
    tagline: 'CBSE Education with Values',
    frontDescription: 'Excellence in holistic education',
    backDescription: 'CBSE-affiliated school nurturing young minds with academic excellence, cultural values, and character development.',
    services: ['CBSE Curriculum', 'Smart Classrooms', 'Sports & Arts', 'Scholarships for Members'],
    ctaText: 'Admissions Inquiry',
    ctaLink: '/subsidiaries',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'zajasol',
    name: 'Zajasol HR Solutions',
    icon: '💼',
    tagline: 'HR & Business Support',
    frontDescription: 'Structured workforce solutions',
    backDescription: 'Providing reliable recruitment, staffing, and administrative support services to corporate clients.',
    services: ['Recruitment Services', 'Manpower Planning', 'Payroll Coordination', 'Compliance Support'],
    ctaText: 'Learn More',
    ctaLink: '/subsidiaries',
    gradient: 'from-purple-500 to-indigo-500'
  },
];

function OrgCard({ org }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="perspective-1000"
    >
      <div
        className="relative h-[450px] cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 glass rounded-2xl p-8 flex flex-col items-center justify-center text-center backface-hidden border border-white/20 shadow-xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${org.gradient} flex items-center justify-center text-5xl mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
              {org.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{org.name}</h3>
            <p className={`text-sm font-semibold bg-gradient-to-r ${org.gradient} bg-clip-text text-transparent mb-4`}>
              {org.tagline}
            </p>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              {org.frontDescription}
            </p>
            <div className="mt-auto pt-8">
              <div className="flex items-center gap-2 text-electric text-sm animate-bounce">
                <span>Tap for details</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div
            className={`absolute inset-0 rounded-2xl p-8 flex flex-col backface-hidden bg-gradient-to-br ${org.gradient} bg-opacity-95 text-white`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <h3 className="text-2xl font-bold mb-3">{org.name}</h3>
            <p className="text-white/90 text-sm leading-relaxed mb-6">
              {org.backDescription}
            </p>

            <div className="flex-grow">
              <h4 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">Services</h4>
              <ul className="space-y-2">
                {org.services.map((service, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex items-start gap-2 text-white/90 text-sm"
                  >
                    <span className="text-yellow-300 font-bold">✓</span>
                    <span>{service}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={org.ctaLink}
                className="block w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm text-center"
              >
                {org.ctaText}
              </a>
              <div className="text-center text-white/70 text-xs">Tap to flip back</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AssociatedOrgs() {
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
  const bgGradient = isDark ? 'bg-gradient-to-b from-[#071428] to-[#03121f]' : 'bg-gradient-to-b from-[#F5FAFF] to-white';

  return (
    <section id="ecosystem" className={`py-24 ${bgGradient} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(39,169,225,0.1)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Ecosystem</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Beyond banking — comprehensive services for health, property, education, and employment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizations.map((org) => (
            <OrgCard key={org.id} org={org} />
          ))}
        </div>

        {/* Member Benefit Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 glass p-6 rounded-xl text-center border border-electric/20"
        >
          <p className="text-sm">
            <span className="text-electric font-semibold">✨ THECOS Members Benefit:</span>
            <span className="text-muted ml-2">
              Special discounts and priority services across all partner organizations
            </span>
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
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
