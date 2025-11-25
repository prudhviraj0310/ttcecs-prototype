import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Hero3D from '../components/Hero3D'
import WhyChoose from '../components/WhyChoose'
import QuickLinks from '../components/QuickLinks'
import LatestNews from '../components/LatestNews'
import DepositSchemes from '../components/DepositSchemes'
import FDCalculator from '../components/FDCalculator'
import Testimonials from '../components/Testimonials'
import AssociatedOrgs from '../components/AssociatedOrgs'
import Services from '../components/Services'
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
        <title>THECOS — Cinematic Financial Dashboard | Fixed Deposits 14.40%</title>
        <meta name="description" content="THECOS — Cooperative financial services with Fixed Deposits at 14.40%, Smart Card access, and comprehensive member services across Chennai branches." />
        <meta property="og:title" content="THECOS — Fixed Deposit 14.40%" />
        <meta property="og:description" content="Premium cooperative banking with modern fintech solutions. High yielding fixed deposits and member services for transport employees." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "THECOS",
            "url": "https://thecos.com",
            "logo": "https://thecos.com/logo.png",
            "contactPoint": [{ "@type": "ContactPoint", "telephone": "+91-9150070312", "contactType": "customer service", "areaServed": "IN" }]
          })
        }} />
      </Head>

      <Header />
      <main>
        {/* Hero: 14.40% with animated counter and CTAs */}
        <Hero3D />

        {/* Why Choose THECOS: 5 key value points with icons */}
        <WhyChoose />

        {/* Quick Links: 6 card navigation to main sections */}
        <QuickLinks />

        {/* Latest News: Carousel with recent announcements */}
        <LatestNews />

        {/* Deposit Schemes: Carousel with all FD/RD plans */}
        <DepositSchemes />

        {/* FD Calculator: Interactive calculator */}
        <FDCalculator />

        {/* Process Story: 4-step journey animation */}
        <Story />

        {/* Member Testimonials: Real member quotes */}
        <Testimonials />

        {/* Subsidiaries: Tempz, Oblong, Vidhyashram, Zajasol */}
        <AssociatedOrgs />

        {/* Services: Financial products overview */}
        <Services />

        {/* Contact: Form + Branch info */}
        <Contact />

        {/* Footer */}
        <Footer />
      </main>

      <Chatbot />
      <ScrollEffects />
    </>
  )
}
