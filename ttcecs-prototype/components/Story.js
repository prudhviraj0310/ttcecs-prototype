// components/Story.js
'use client';
import { useState, useEffect } from 'react';
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
      title: 'Discovery',
      desc: 'Member needs assessment & compliance check',
      anim: discoveryAnim,
      icon: '🔍',
    },
    {
      title: 'Design',
      desc: 'Solution architecture & rate structuring',
      anim: designAnim,
      icon: '📐',
    },
    {
      title: 'Implementation',
      desc: 'Deploy Smart Card & digital systems',
      anim: implementationAnim,
      icon: '⚙️',
    },
    {
      title: 'Optimization',
      desc: 'Monitor performance & member satisfaction',
      anim: optimizationAnim,
      icon: '',
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
          <h2 className="text-3xl md:text-5xl font-bold">Our Process</h2>
          <p className="text-muted mt-4 text-lg max-w-2xl mx-auto">
            A systematic journey from assessment to measurable impact for every member.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="story-card glass p-6 rounded-2xl relative group hover:scale-105 transition-transform"
            >
              {/* Step number */}
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-electric text-[#00121a] font-bold flex items-center justify-center text-sm">
                {i + 1}
              </div>

              {/* Icon fallback for mobile */}
              <div className="text-5xl mb-4 lg:hidden">{s.icon}</div>

              {/* Lottie animation (desktop) */}
              <div className="w-full h-40 hidden lg:block">
                <Lottie animationData={s.anim} loop autoplay />
              </div>

              <h3 className="mt-4 font-bold text-xl">{s.title}</h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">{s.desc}</p>
              
              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-electric group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Process flow line (desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/10 to-transparent -translate-y-1/2" />
      </div>
    </section>
  );
}
