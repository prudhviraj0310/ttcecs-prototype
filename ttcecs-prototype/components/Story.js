// components/Story.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lottie from 'lottie-react';
import discoveryAnim from '../public/animations/discovery.json';
import designAnim from '../public/animations/design.json';
import implementationAnim from '../public/animations/implementation.json';
import optimizationAnim from '../public/animations/optimization.json';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Story() {
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
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: '🔍 Discovery Phase',
      subtitle: 'Understanding Your Needs',
      desc: 'We begin with a comprehensive assessment of your financial goals and requirements',
      anim: discoveryAnim,
      icon: '🔍',
      image: '/office-workspace.jpg',
      features: [
        '📋 Member profile analysis',
        '💼 Financial needs assessment',
        '✅ Compliance verification',
        '🎯 Goal setting session'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: '📐 Design & Planning',
      subtitle: 'Crafting Your Solution',
      desc: 'Our experts design a customized financial solution tailored to your unique situation',
      anim: designAnim,
      icon: '📐',
      image: '/financial-planning.jpg',
      features: [
        '📊 Rate structure optimization',
        '🏗️ Solution architecture',
        '💰 Investment planning',
        '📈 Growth projections'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: '⚙️ Implementation',
      subtitle: 'Making It Happen',
      desc: 'Seamless deployment of your Smart Card and digital financial systems',
      anim: implementationAnim,
      icon: '⚙️',
      image: '/banking-services.jpg',
      features: [
        '💳 Smart Card activation',
        '📱 Digital account setup',
        '🔐 Security configuration',
        '🚀 System launch'
      ],
      color: 'from-green-500 to-teal-500'
    },
    {
      title: '📊 Optimization',
      subtitle: 'Continuous Improvement',
      desc: 'Ongoing monitoring and optimization to ensure maximum returns and satisfaction',
      anim: optimizationAnim,
      icon: '📊',
      image: '/growth-chart.jpg',
      features: [
        '📈 Performance tracking',
        '💬 Member feedback',
        '🎯 Goal achievement review',
        '✨ Service enhancement'
      ],
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <section
      id="story"
      className={`py-24 ${bgGradient} relative overflow-hidden`}
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
            🎯 Our Process - Your Journey to Success
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
            A systematic <span className="font-bold text-brand-blue">4-step journey</span> from initial assessment to measurable impact.
            We're with you every step of the way! 🚀
          </p>

          {/* Stats badges */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <div className={`px-6 py-3 rounded-full ${isDark ? 'bg-[#0a1628]' : 'bg-white'} shadow-lg border ${isDark ? 'border-[#1a2942]' : 'border-brand-gray-light'}`}>
              <span className="text-2xl mr-2">⚡</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>Fast Processing</span>
            </div>
            <div className={`px-6 py-3 rounded-full ${isDark ? 'bg-[#0a1628]' : 'bg-white'} shadow-lg border ${isDark ? 'border-[#1a2942]' : 'border-brand-gray-light'}`}>
              <span className="text-2xl mr-2">🎯</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>Personalized Service</span>
            </div>
            <div className={`px-6 py-3 rounded-full ${isDark ? 'bg-[#0a1628]' : 'bg-white'} shadow-lg border ${isDark ? 'border-[#1a2942]' : 'border-brand-gray-light'}`}>
              <span className="text-2xl mr-2">💯</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-brand-teal'}`}>100% Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`story-card ${isDark ? 'bg-[#0a1628]' : 'bg-white'} rounded-3xl overflow-hidden shadow-2xl relative group hover:scale-[1.02] transition-all duration-300`}
            >
              {/* Background Image with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover opacity-80"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-70`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Step number badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white text-black font-black flex items-center justify-center text-xl shadow-lg">
                  {i + 1}
                </div>

                {/* Large emoji icon */}
                <div className="absolute bottom-4 left-6 text-6xl drop-shadow-lg">
                  {s.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`font-black text-2xl mb-2 ${isDark ? 'text-white' : 'text-brand-teal'}`}>
                  {s.title}
                </h3>
                <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-electric' : 'text-brand-blue'}`}>
                  {s.subtitle}
                </p>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-muted' : 'text-brand-gray'}`}>
                  {s.desc}
                </p>

                {/* Features list */}
                <div className="space-y-2">
                  <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${isDark ? 'text-electric' : 'text-brand-teal'}`}>
                    ✨ Key Features
                  </p>
                  {s.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 text-sm ${isDark ? 'text-white' : 'text-gray-700'}`}
                    >
                      <span className="text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-6 relative">
                  <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${s.color} transition-all duration-1000`}
                      style={{ width: `${((i + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none rounded-3xl`} />
            </div>
          ))}
        </div>

        {/* Process flow line (desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/10 to-transparent -translate-y-1/2" />
      </div>
    </section>
  );
}
