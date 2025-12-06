import '../styles/globals.css'
import WhatsAppButton from '../components/WhatsAppButton'
import ScrollProgress from '../components/ScrollProgress'
import Chatbot from '../components/Chatbot'
import { Particles } from '@/components/ui/particles'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
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
    <>
      <div className="site-background" />
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-30">
        <Particles
          className="absolute inset-0"
          quantity={200}
          ease={80}
          size={1.4}
          color={isDark ? "#ffffff" : "#00303D"}
          refresh
        />
      </div>
      <ScrollProgress />
      <Component {...pageProps} />
      <WhatsAppButton />
      <Chatbot />
    </>
  )
}
