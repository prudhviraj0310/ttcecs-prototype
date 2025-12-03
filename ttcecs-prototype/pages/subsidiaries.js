import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function Subsidiaries() {
  const subsidiaries = [
    {
      name: 'Thiruvalluvar Vidyashram',
      subtitle: 'CBSE School',
      icon: '🎓',
      color: 'from-green-500 to-emerald-500',
      mission: 'Affiliated to CBSE, New Delhi',
      description: 'Thiruvalluvar Vidyashram is a values-driven CBSE school committed to providing high-quality, holistic education from Kindergarten to Class 12. The institution combines academic excellence with co-curricular development to nurture confident, disciplined, and well-rounded students prepared for the modern world.',
      services: [
        { name: 'Academics (CBSE Aligned)', desc: 'Modern pedagogy, concept-based teaching, continuous assessments, and strong board exam preparation.' },
        { name: 'Holistic Development', desc: 'Sports, arts, cultural programs, personality development, and life-skill training.' },
        { name: 'Safe & Supportive Environment', desc: 'A child-centric campus designed to promote emotional wellbeing, empathy, and confidence.' },
        { name: 'Tech-Enabled Learning', desc: 'Smart classrooms, digital tools, and interactive methodologies.' }
      ],
      details: [
        { label: 'Affiliation', value: 'CBSE' },
        { label: 'Grades', value: 'KG to Class 12' },
        { label: 'Location', value: 'Chennai' }
      ]
    },
    {
      name: 'Oblong Realties Pvt. Ltd.',
      subtitle: 'Real Estate & Asset Development',
      icon: '🏘️',
      color: 'from-blue-500 to-cyan-500',
      mission: 'Building a strong and future-ready infrastructure base',
      description: 'Oblong Realties Pvt. Ltd. is the Group’s dedicated real-estate and asset-development arm. Oblong focuses on acquiring, developing, and managing high-value properties across Tamil Nadu and Karnataka. Between 2020 and 2025, Oblong spearheaded multiple landmark acquisitions—ranging from residential landbanks to premium villas and hospitality assets.',
      services: [
        { name: 'Strategic Property Acquisition', desc: 'High-potential landbanks, residential plots, and commercial assets.' },
        { name: 'Real Estate Development', desc: 'Villas, apartments, plotted communities, institutional buildings, and urban development projects.' },
        { name: 'Portfolio Management', desc: 'Efficient administration of diversified assets including schools, residential layouts, hotels, and premium land.' },
        { name: 'Future-Ready Projects', desc: 'Senior living homes, EV-enabled pitstops, premium villa projects, and gated communities.' }
      ],
      details: [
        { label: 'Portfolio', value: 'Chennai, Bengaluru, Coimbatore, Tirunelveli, Kanyakumari' },
        { label: 'Key Projects', value: 'Mogappair Urban Blocks, Perungudi School Campus, ECR Kunnukadu Land' }
      ]
    },
    {
      name: 'Tempz Hospital',
      subtitle: '24×7 Multispeciality Hospital',
      icon: '🏥',
      color: 'from-red-500 to-pink-500',
      mission: 'Accessible, ethical, and patient-centred medical care',
      description: 'Tempz Hospital is a 24×7 multispeciality healthcare centre located in Anna Nagar West, Chennai. Established in 2021, it delivers accessible, ethical, and patient-centred medical care for individuals and families. Operated under Tempz Academy Educational & Medical Charitable Foundation.',
      services: [
        { name: 'Doctor Consultations', desc: 'General & specialist care' },
        { name: 'Dialysis Unit', desc: 'Safe, hygienic treatment for renal patients' },
        { name: 'Physiotherapy', desc: 'Rehabilitation & therapeutic care' },
        { name: 'Diagnostics', desc: 'X-Ray, Imaging, and Laboratory Tests with fast reporting' },
        { name: 'In-house Pharmacy', desc: 'Quality medicines & essential supplies' }
      ],
      details: [
        { label: 'Entity', value: 'Tempz Academy Educational & Medical Charitable Foundation' },
        { label: 'Type', value: 'Section 8 Non-Profit' },
        { label: 'Location', value: 'Anna Nagar West, Chennai' }
      ]
    },
    {
      name: 'ZAJASOL HR Solutions Pvt. Ltd.',
      subtitle: 'HR & Business Support Services',
      icon: '💼',
      color: 'from-purple-500 to-indigo-500',
      mission: 'Structured, reliable, and efficient workforce solutions',
      description: 'ZAJASOL HR Solutions Pvt. Ltd., established in 2022, is the Group’s HR and business-support services subsidiary. The company provides structured, reliable, and efficient workforce and administrative solutions to corporate clients across sectors.',
      services: [
        { name: 'Human Resource Services', desc: 'Recruitment, manpower planning, staffing, and talent supply.' },
        { name: 'Business Support', desc: 'Office administration, onboarding facilitation, payroll coordination, compliance support.' },
        { name: 'Operational Support', desc: 'Services tailored for institutions, corporate offices, and service-sector businesses.' }
      ],
      details: [
        { label: 'Incorporated', value: '22 December 2022' },
        { label: 'Type', value: 'Private Limited' },
        { label: 'Office', value: 'No. 25, Coats Road, Chennai – 600017' }
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>Subsidiaries — THECOS Group Companies</title>
        <meta name="description" content="Explore THECOS subsidiaries - Thiruvalluvar Vidhyashram, Oblong Realties, Tempz Hospital, and Zajasol HR Solutions." />
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
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                    <div className="text-6xl bg-white/20 p-4 rounded-2xl w-fit backdrop-blur-sm shadow-lg">{sub.icon}</div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{sub.name}</h2>
                      <p className="text-xl text-white/90 font-medium">{sub.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-lg text-white/90 italic border-l-4 border-white/30 pl-4">
                    "{sub.mission}"
                  </p>
                </div>

                <div className="p-8 md:p-12">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    {sub.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {sub.services.map((service, sidx) => (
                      <div key={sidx} className="bg-gray-50 dark:bg-[#1a2942] rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{service.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{service.desc}</p>
                      </div>
                    ))}
                  </div>

                  {sub.details && (
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                      {sub.details.map((detail, didx) => (
                        <div key={didx} className="bg-gray-100 dark:bg-[#0a1628] px-4 py-2 rounded-lg text-sm">
                          <span className="text-gray-500 dark:text-gray-500 mr-2">{detail.label}:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
                  { icon: '🏥', title: 'Healthcare', value: 'Affordable medical services' },
                  { icon: '🏘️', title: 'Housing', value: 'Dream homes for members' },
                  { icon: '🎓', title: 'Education', value: 'Quality CBSE schooling' },
                  { icon: '💼', title: 'Employment', value: 'Job placement support' }
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
