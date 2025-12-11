// components/Contact.js
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [theme, setTheme] = useState('light');

  // Theme detection
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
  const bgGradient = isDark ? 'bg-gradient-to-b from-[#071428] to-[#03121f]' : 'bg-gradient-to-b from-white to-[#F5FAFF]';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-brand-teal';
  const mutedColor = isDark ? 'text-muted' : 'text-brand-gray';

  const branches = [
    {
      name: 'Anna Nagar',
      shortName: 'Anna Nagar',
      address: 'No:1735, 18th Main Rd, Anna Nagar West, Chennai, Tamil Nadu 600040',
      phone: '+91 90259 47007',
      email: 'itsupport@ttcecs.com',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.096753046274!2d80.199333!3d13.094754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAnna%20Nagar!5e0!3m2!1sen!2sin',
      mapLink: 'https://maps.google.com/?q=13.094754,80.199333',
    },
    {
      name: 'Nanganallur',
      shortName: 'Nanganallur',
      address: 'Nanganallur, Chennai, Tamil Nadu 600061',
      phone: '+91 91500 70313',
      email: 'itsupport@ttcecs.com',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.828472!2d80.188400!3d12.985967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNanganallur!5e0!3m2!1sen!2sin',
      mapLink: 'https://maps.google.com/?q=12.985967,80.188400',
    },
    {
      name: 'T Nagar',
      shortName: 'T. Nagar',
      address: 'B.O Old No.25, New No.14, Coats Road, T Nagar, Chennai – 600017',
      phone: '+91 63834 02323',
      email: 'itsupport@ttcecs.com',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d80.233627!3d13.043965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sT%20Nagar!5e0!3m2!1sen!2sin',
      mapLink: 'https://maps.google.com/?q=13.043965,80.233627',
    },
    {
      name: 'Kilambakkam',
      shortName: 'Kilambakkam',
      address: 'B.O No.114, GST Road, Urapakkam, Chengalpattu - 603210',
      phone: '+91 99404 09335',
      email: 'itsupport@ttcecs.com',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.2!2d80.075058!3d12.865311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKilambakkam!5e0!3m2!1sen!2sin',
      mapLink: 'https://maps.google.com/?q=12.865311,80.075058',
    },
    {
      name: 'Coimbatore',
      shortName: 'Coimbatore',
      address: 'B.O No: 29, 1st floor, Gokulam complex, Siruvani Main Road, Alanthurai - 641101',
      phone: '+91 87787 95546',
      email: 'itsupport@ttcecs.com',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3!2d76.789352!3d10.953916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCoimbatore!5e0!3m2!1sen!2sin',
      mapLink: 'https://maps.google.com/?q=10.953916,76.789352',
    },
    {
      name: 'Nagercoil',
      shortName: 'Nagercoil',
      address: '2nd Floor, Centree Tower, Dennison Road, Near Vasantham Hospital, Nagercoil - 1',
      phone: '+91 87547 61657',
      email: 'itsupport@ttcecs.com',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.8!2d77.4324!3d8.1790!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04ed0f5e0f5e0f%3A0x1f5e0f5e0f5e0f5e!2sNagercoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890',
      mapLink: 'https://maps.google.com/?q=8.1790,77.4324',
    },
  ];

  const currentBranch = branches[selectedBranch];

  return (
    <section id="contact" className={`py-24 ${bgGradient} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(39,169,225,0.05)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">Contact & Visit Us</h2>
          <p className="text-muted mt-4 text-lg">Reach out or visit any of our branches</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF512F] via-[#00F260] to-[#0575E6]" />
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData);
              const message = `*New Inquiry from Website*
              
*Name:* ${data.name}
*Email:* ${data._replyto}
*Phone:* ${data.phone}

*Message:*
${data.message}`;

              const whatsappUrl = `https://wa.me/919150070311?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }} className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${textColor}`}>Full Name *</label>
                <input
                  name="name"
                  required
                  className={`w-full p-3 rounded-lg ${isDark ? 'bg-[#0a1628] border-[#1a2942] text-white' : 'bg-white border-brand-gray-light'} border focus:border-brand-blue focus:outline-none transition`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${textColor}`}>Email *</label>
                <input
                  name="_replyto"
                  required
                  type="email"
                  className={`w-full p-3 rounded-lg ${isDark ? 'bg-[#0a1628] border-[#1a2942] text-white' : 'bg-white border-brand-gray-light'} border focus:border-brand-blue focus:outline-none transition`}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${textColor}`}>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  className={`w-full p-3 rounded-lg ${isDark ? 'bg-[#0a1628] border-[#1a2942] text-white' : 'bg-white border-brand-gray-light'} border focus:border-brand-blue focus:outline-none transition`}
                  placeholder="+91 12345 67890"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${textColor}`}>Message *</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  className={`w-full p-3 rounded-lg ${isDark ? 'bg-[#0a1628] border-[#1a2942] text-white' : 'bg-white border-brand-gray-light'} border focus:border-brand-blue focus:outline-none transition resize-none`}
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue text-[#00121a] py-3 rounded-lg font-bold hover:bg-brand-blue/90 transition"
              >
                Send Message
              </button>
            </form>

            {/* Quick contact info */}
            <div className="mt-8 pt-8 border-t border-brand-gray-light space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  📞
                </div>
                <div>
                  <div className="text-sm text-muted">Call Us</div>
                  <div className="font-semibold">{currentBranch.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  ✉️
                </div>
                <div>
                  <div className="text-sm text-muted">Email</div>
                  <div className="font-semibold">{currentBranch.email}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Branch Locations & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8E2DE2] via-[#DD2476] to-[#FFD200]" />
            <h3 className="text-2xl font-bold mb-6">Our Branches</h3>

            {/* Branch selector */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              {branches.map((branch, index) => (
                <button
                  key={branch.name}
                  onClick={() => setSelectedBranch(index)}
                  className={`p-3 rounded-lg text-sm font-semibold transition ${selectedBranch === index
                    ? 'bg-brand-blue text-[#00121a]'
                    : 'bg-white shadow-sm hover:bg-white/10'
                    }`}
                >
                  {branch.shortName || branch.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Selected branch info */}
            <motion.div
              key={selectedBranch}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className={`${isDark ? 'bg-[#0a1628]' : 'bg-white'} shadow-sm p-4 rounded-lg`}>
                <h4 className="font-bold text-lg text-brand-blue">{currentBranch.name}</h4>
                <p className="text-sm text-muted mt-2">{currentBranch.address}</p>
                <div className="flex gap-4 mt-4">
                  <a
                    href={`tel:${currentBranch.phone}`}
                    className="text-sm text-brand-blue hover:underline"
                  >
                    📞 {currentBranch.phone}
                  </a>
                  <a
                    href={`mailto:${currentBranch.email}`}
                    className="text-sm text-brand-blue hover:underline"
                  >
                    ✉️ Email
                  </a>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="rounded-lg overflow-hidden border border-brand-gray-light">
                <iframe
                  title={`${currentBranch.name} Location`}
                  src={currentBranch.mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Map actions */}
              <div className="flex gap-3">
                <a
                  href={currentBranch.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue py-3 rounded-lg text-center font-semibold text-sm transition"
                >
                  Open in Google Maps
                </a>
                <a
                  href={currentBranch.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white shadow-sm hover:bg-white/10 py-3 rounded-lg text-center font-semibold text-sm transition"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>

            {/* Branch timing info */}
            <div className="mt-6 pt-6 border-t border-brand-gray-light">
              <h4 className="font-semibold mb-3">Branch Timings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Monday - Saturday:</span>
                  <span className="font-semibold">9:00 AM - 6:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Sunday:</span>
                  <span className="font-semibold">9:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* All branches quick view */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((branch, index) => (
            <motion.button
              key={branch.name}
              onClick={() => setSelectedBranch(index)}
              whileHover={{ scale: 1.02 }}
              className={`glass p-4 rounded-xl text-left transition relative overflow-hidden glass-iridescent ${selectedBranch === index ? 'ring-2 ring-electric' : ''
                }`}
            >
              {selectedBranch === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF512F]/10 to-[#0575E6]/10 pointer-events-none" />
              )}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0">
                  📍
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-sm">{branch.name}</h5>
                  <p className="text-xs text-muted mt-1 truncate">{branch.address}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
