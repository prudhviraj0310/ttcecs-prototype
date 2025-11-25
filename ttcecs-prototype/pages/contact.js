import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const branches = [
    {
      name: 'Anna Nagar (Head Office)',
      address: 'No. 1735, 18th Main Road, Anna Nagar West, Chennai – 600040',
      phone: '+91 90259 47007',
      icon: '',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.368662809545!2d80.20637731482264!3d13.087636390776892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265e1ef8e0f8d%3A0x7f9f8e0c1e8c1e8c!2s18th%20Main%20Rd%2C%20Anna%20Nagar%20West%2C%20Chennai%2C%20Tamil%20Nadu%20600040!5e0!3m2!1sen!2sin!4v1732451234567!5m2!1sen!2sin'
    },
    {
      name: 'T. Nagar',
      address: 'T. Nagar Branch, Chennai',
      phone: '+91 63834 02323',
      icon: '🏪',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.196812345678!2d80.23412341482156!3d13.041234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e1ef8e0f8d%3A0x7f9f8e0c1e8c1e8c!2sT.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1732451234567!5m2!1sen!2sin'
    },
    {
      name: 'Kilambakkam',
      address: 'Kilambakkam Branch, Chennai',
      phone: '+91 99404 09355',
      icon: '🏪',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.5678901234567!2d80.0567890148!3d12.812345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525e1ef8e0f8d%3A0x7f9f8e0c1e8c1e8c!2sKilambakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1732451234567!5m2!1sen!2sin'
    },
    {
      name: 'Nagercoil',
      address: 'Nagercoil Branch, Tamil Nadu',
      phone: '+91 87547 61657',
      icon: '🏪',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.789012345678!2d77.42345671479!3d8.173456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04ed2ef8e0f8d%3A0x7f9f8e0c1e8c1e8c!2sNagercoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1732451234567!5m2!1sen!2sin'
    },
    {
      name: 'Coimbatore',
      address: 'Coimbatore Branch, Tamil Nadu',
      phone: '+91 87787 95546',
      icon: '🏪',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.123456789012!2d76.95678901478!3d11.012345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8581e1ef8e0f8d%3A0x7f9f8e0c1e8c1e8c!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1732451234567!5m2!1sen!2sin'
    },
    {
      name: 'Nanganallur',
      address: 'Nanganallur Branch, Chennai',
      phone: '+91 91500 70313',
      icon: '🏪',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789012!2d80.18765431481!3d13.001234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526e1ef8e0f8d%3A0x7f9f8e0c1e8c1e8c!2sNanganallur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1732451234567!5m2!1sen!2sin'
    }
  ]

  return (
    <>
      <Head>
        <title>Contact Us — Thecos Branch Locations & Support</title>
        <meta name="description" content="Contact Thecos - Visit our branches in Anna Nagar, T. Nagar, Kilambakkam, Nagercoil, Coimbatore, and Nanganallur. Call us for support." />
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
                Get in Touch
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                We're here to help. Reach out to us via phone, email, or visit any of our branches
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all"
              >
                <div className="text-6xl mb-4">📞</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Call Us</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Head Office (Anna Nagar)</p>
                <a href="tel:+919025947007" className="text-[#27A9E1] font-bold text-lg hover:underline">
                  +91 90259 47007
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all"
              >
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Email Us</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">For support & inquiries</p>
                <a href="mailto:support@thecos.com" className="text-[#27A9E1] font-bold text-lg hover:underline">
                  support@thecos.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all"
              >
                <div className="text-6xl mb-4"></div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">WhatsApp</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Chat with Thecos Bot</p>
                <a href="https://wa.me/919150070311" target="_blank" rel="noopener noreferrer" className="text-[#27A9E1] font-bold text-lg hover:underline">
                  +91 91500 70311
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Branch Locations Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#EA2E89]/10 to-[#27A9E1]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">Our Branch Locations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {branches.map((branch, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-xl overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-5xl">{branch.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{branch.name}</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">{branch.address}</p>
                        <a 
                          href={`tel:${branch.phone.replace(/\s/g, '')}`}
                          className="text-[#27A9E1] font-bold hover:underline flex items-center gap-2"
                        >
                          <span>📞</span>
                          <span>{branch.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Google Map Embed */}
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700">
                    <iframe
                      src={branch.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${branch.name}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-8 text-center text-gray-900 dark:text-white">
              Send Us a Message
            </h2>
            <Contact />
          </div>
        </section>

        {/* Additional Contact Options */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#27A9E1]/10 to-[#EA2E89]/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">More Ways to Connect</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Thecos Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">🤖</div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">Thecos Chatbot</p>
                      <a href="https://wa.me/919150070311" target="_blank" rel="noopener noreferrer" className="text-[#27A9E1] hover:underline">
                        +91 91500 70311
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#0f1f3a] rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Tempz Hospital</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl"></div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">Tempz Hospital Chatbot</p>
                      <a href="https://wa.me/919150070312" target="_blank" rel="noopener noreferrer" className="text-[#27A9E1] hover:underline">
                        +91 91500 70312
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Legal Info Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0f1f3a] rounded-3xl shadow-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-black mb-6 text-gray-900 dark:text-white">Legal & Compliance</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p><strong>GSTIN:</strong> 33AAIAT2044E1ZU</p>
                <p><strong>LEI:</strong> 3358004B6E98BGWE1P16</p>
                <p><strong>Registration:</strong> MSCS/CR/16-91</p>
                <p className="text-sm mt-6">
                  Registered under the Multi-State Co-operative Societies Act, 2002
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
