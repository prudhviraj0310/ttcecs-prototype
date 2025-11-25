import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function Subsidiaries() {
  const subsidiaries = [
    {
      name: 'Tempz Academy & Medical Charitable Foundation',
      icon: '',
      color: 'from-red-500 to-pink-500',
      mission: 'Affordable healthcare for all members and their families',
      services: [
        { name: 'Tempz Hospital', desc: 'Comprehensive medical services' },
        { name: 'Tempz Pharmacy', desc: 'Quality medicines at affordable prices' },
        { name: 'Tempz Clinical Laboratory', desc: 'Accurate diagnostic services' }
      ]
    },
    {
      name: 'Oblong Realties Pvt. Ltd.',
      icon: '🏘️',
      color: 'from-blue-500 to-cyan-500',
      mission: 'Not just houses — building your dream home',
      services: [
        { name: 'Real Estate Development', desc: 'Quality residential projects' },
        { name: 'Property Consultation', desc: 'Expert guidance for home buyers' },
        { name: 'Construction Services', desc: 'Turnkey construction solutions' }
      ]
    },
    {
      name: 'Thiruvalluvar Vidhyashram',
      icon: '🎓',
      color: 'from-green-500 to-emerald-500',
      mission: 'Creating responsible, value-driven citizens',
      services: [
        { name: 'CBSE Curriculum', desc: 'Quality education with CBSE affiliation' },
        { name: 'Holistic Development', desc: 'Focus on academics and character building' },
        { name: 'Modern Facilities', desc: 'State-of-the-art learning infrastructure' }
      ]
    },
    {
      name: 'Zajasol HR Solutions Pvt. Ltd.',
      icon: '',
      color: 'from-purple-500 to-pink-500',
      mission: 'Helping members and community find professional job placements',
      services: [
        { name: 'Manpower Placement', desc: 'Connecting talent with opportunities' },
        { name: 'Recruitment Services', desc: 'Professional staffing solutions' },
        { name: 'Career Guidance', desc: 'Expert career counseling' }
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>Subsidiaries — THECOS Group Companies</title>
        <meta name="description" content="Explore THECOS subsidiaries - Tempz Healthcare, Oblong Realties, Thiruvalluvar Vidhyashram, and Zajasol HR Solutions." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#071428] dark:to-[#0a1628]">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#EA2E89] to-[#27A9E1] bg-clip-text text-transparent">
                Our Subsidiaries
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                A broader ecosystem of services for comprehensive member welfare
              </p>
            </motion.div>
          </div>
        </section>

        {/* Subsidiaries Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            {subsidiaries.map((sub, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${sub.color} p-8 md:p-12`}>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="text-7xl">{sub.icon}</div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{sub.name}</h2>
                      <p className="text-xl text-white/90 italic">{sub.mission}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-3 gap-6">
                    {sub.services.map((service, sidx) => (
                      <div key={sidx} className="bg-gray-50 dark:bg-[#1a2942] rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.name}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{service.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/10 to-[#27A9E1]/10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-8 text-gray-900 dark:text-white">Our Collective Impact</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: '', title: 'Healthcare', value: 'Affordable medical services' },
                  { icon: '🏘️', title: 'Housing', value: 'Dream homes for members' },
                  { icon: '🎓', title: 'Education', value: 'Quality CBSE schooling' },
                  { icon: '', title: 'Employment', value: 'Job placement support' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-6"
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
