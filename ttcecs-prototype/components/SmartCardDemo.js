import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Smart Card feature showcase with Lottie animation
 * Demonstrates QR + OTP secure access flow
 */
export default function SmartCardDemo() {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, title: 'Scan QR Code', desc: 'Present your Smart Card at any terminal' },
    { id: 2, title: 'Enter OTP', desc: 'Receive and enter your secure OTP' },
    { id: 3, title: 'Access Granted', desc: 'Check deposits, apply for services instantly' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center">Smart Card Technology</h2>
      <p className="text-muted mt-2 text-center max-w-2xl mx-auto">
        Secure, fast, and convenient — QR + OTP authentication for all members
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
        {/* Animation */}
        {/* Animation/Image */}
        <div className="flex justify-center">
          <div className="relative w-80 md:w-96 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
            <img
              src="/images/member-card.png"
              alt="THECOS Smart Card"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((s) => (
            <motion.div
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`glass p-5 rounded-lg cursor-pointer transition-all ${step === s.id ? 'border-2 border-electric' : 'border border-transparent'
                }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === s.id ? 'bg-electric text-[#00121a]' : 'bg-white/5'
                  }`}>
                  {s.id}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="text-muted text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <button className="w-full bg-electric text-[#00121a] py-3 rounded-md font-semibold mt-6">
            Apply for Smart Card →
          </button>
        </div>
      </div>
    </section>
  );
}
