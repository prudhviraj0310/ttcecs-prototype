'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Testimonials() {
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

  const testimonials = [
    {
      quote: "Thanks to THECOS, I could buy gold safely and pay it back swiftly — no hidden fees.",
      name: "Rajesh Kumar",
      role: "SETC Employee, 12 years",
      rating: 5,
      image: "/testimonial-4.jpg"
    },
    {
      quote: "The 14.40% interest rate on FD is unbeatable. My savings grow faster here than any bank.",
      name: "Priya Shankar",
      role: "Member since 2015",
      rating: 5,
      image: "/testimonial-2.jpg"
    },
    {
      quote: "Marriage advance loan helped me during my daughter's wedding. Zero interest - truly member-first!",
      name: "Venkatesh Iyer",
      role: "SETC Driver, Anna Nagar",
      rating: 5,
      image: "/testimonial-1.jpg"
    },
    {
      quote: "Smart Card makes everything so easy. I can track all my deposits and loans in one place.",
      name: "Lakshmi Devi",
      role: "Member since 2018",
      rating: 5,
      image: "/testimonial-3.jpg"
    }
  ];

  return (
    <section className={`py-20 px-6 ${isDark ? 'bg-[#0f1f3a]' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
            Member Testimonials
          </h2>
          <p className={`text-lg ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
            Real stories from our valued members
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${isDark ? 'bg-[#0a1628]' : 'bg-white'} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all relative`}
            >
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <p className={`${isDark ? 'text-white' : 'text-gray-700'} mb-6 italic relative z-10 leading-relaxed text-center`}>
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="border-t pt-4 text-center" style={{ borderColor: isDark ? '#1a2942' : '#e5eaf0' }}>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>
                  {testimonial.name}
                </p>
                <p className={`text-sm ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className={`text-lg mb-6 ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
            Join 125,000+ satisfied members today
          </p>
          <motion.a
            href="/membership"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Become a Member
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
