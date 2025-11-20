import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Hero3D from '../components/Hero3D'
import ScrollHandMoney from '../components/ScrollHandMoney'
import FDCalculator from '../components/FDCalculator'
import DepositSchemes from '../components/DepositSchemes'
import SmartCardDemo from '../components/SmartCardDemo'
import AssociatedOrgs from '../components/AssociatedOrgs'
import Globe from '../components/Globe'
import Services from '../components/Services'
import Impact from '../components/Impact'
import Gallery from '../components/Gallery'
import Projects from '../components/Projects'
import Resources from '../components/Resources'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

// Dynamically import components that use GSAP (no SSR)
const Story = dynamic(() => import('../components/Story'), { ssr: false })
const ScrollEffects = dynamic(() => import('../components/ScrollEffects'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>TTCECS — Cinematic Financial Dashboard | Fixed Deposits 14.40%</title>
        <meta name="description" content="TTCECS — Cooperative financial services with Fixed Deposits at 14.40%, Smart Card access, and comprehensive member services across Chennai branches." />
        <meta property="og:title" content="TTCECS — Fixed Deposit 14.40%" />
        <meta property="og:description" content="Premium cooperative banking with modern fintech solutions. High yielding fixed deposits and member services for transport employees." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "TTCECS",
            "url": "https://ttcecs.com",
            "logo": "https://ttcecs.com/logo.png",
            "contactPoint": [{ "@type": "ContactPoint", "telephone": "+91-9150070312", "contactType": "customer service", "areaServed": "IN" }]
          })
        }} />
      </Head>

      <Header />
      <main>
        {/* Hero: 3D coins forming "14.40%" with animated ROI counter */}
        <Hero3D />
        
        {/* Cinematic Trust Exchange: Hands + Money scroll animation */}
        <ScrollHandMoney />
        
        {/* FD Calculator: Interactive sliders with live ROI chart */}
        <FDCalculator />
        
        {/* Deposit Schemes: Carousel with flip cards (DMG, GNX, etc.) */}
        <DepositSchemes />
        
        {/* Process Story: 4-step GSAP scroll animation */}
        <Story />
        
        {/* Smart Card: Lottie animation demo */}
        <SmartCardDemo />
        
        {/* Associated Organizations: Tempz, Oblong, Vidhyashram flip cards */}
        <AssociatedOrgs />
        
        {/* Branch Locator: 3D Globe with 6 real branch pins */}
        <Globe />
        
        {/* Services: Financial products grid */}
        <Services />
        
        {/* Impact Metrics: Animated counters with sparklines */}
        <Impact />
        
        {/* Gallery: Masonry grid with events & programs */}
        <Gallery />
        
        {/* Projects: Key initiatives showcase */}
        <Projects />
        
        {/* Resources: Downloadable PDFs & certificates */}
        <Resources />
        
        {/* Contact: Form + Map + Phone */}
        <Contact />
        
        {/* Footer */}
        <Footer />
      </main>

      <Chatbot />
      <ScrollEffects />
    </>
  )
}
