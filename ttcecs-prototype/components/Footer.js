import Image from 'next/image';

export default function Footer() {
  const branches = [
    { name: 'Anna Nagar', phone: '+91 90259 47007' },
    { name: 'T. Nagar', phone: '+91 63834 02323' },
    { name: 'Kilambakkam', phone: '+91 99404 09355' },
    { name: 'Nagercoil', phone: '+91 87547 61657' },
    { name: 'Coimbatore', phone: '+91 87787 95546' },
    { name: 'Nanganallur', phone: '+91 91500 70313' },
  ];

  const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark';

  return (
    <footer className={`mt-20 border-t ${isDark ? 'bg-[#050f1e] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-32 h-12">
                <Image
                  src="/logo.png"
                  alt="THECOS Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className={`text-sm leading-relaxed mb-6 max-w-sm ${isDark ? 'text-muted' : 'text-gray-600'}`}>
              Thiruvalluvar Transport Corporation Employees' Co-operative Credit Society Ltd.
              <br />
              <span className="opacity-70">Registration No. MSCS/CR/16-91</span>
            </p>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-brand-teal'}`}>
              Empowering Members Since 1991
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold mb-6 ${isDark ? 'text-white' : 'text-brand-teal'}`}>Quick Links</h4>
            <ul className={`space-y-3 text-sm ${isDark ? 'text-muted' : 'text-gray-600'}`}>
              <li><a href="/" className="hover:text-brand-blue transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-brand-blue transition-colors">About Us</a></li>
              <li><a href="/membership" className="hover:text-brand-blue transition-colors">Membership</a></li>
              <li><a href="/loans" className="hover:text-brand-blue transition-colors">Loans</a></li>
              <li><a href="/downloads" className="hover:text-brand-blue transition-colors">Downloads</a></li>
            </ul>
          </div>

          {/* Branch Hotlines */}
          <div>
            <h4 className={`font-bold mb-6 ${isDark ? 'text-white' : 'text-brand-teal'}`}>Branch Hotlines</h4>
            <ul className={`space-y-3 text-sm ${isDark ? 'text-muted' : 'text-gray-600'}`}>
              {branches.map((branch) => (
                <li key={branch.name} className="flex justify-between gap-4">
                  <span>{branch.name}</span>
                  <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="hover:text-brand-blue transition-colors whitespace-nowrap font-medium">
                    {branch.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-bold mb-6 ${isDark ? 'text-white' : 'text-brand-teal'}`}>Head Office</h4>
            <ul className={`space-y-4 text-sm ${isDark ? 'text-muted' : 'text-gray-600'}`}>
              <li className="leading-relaxed">
                No. 1735, 18th Main Road,<br />
                Anna Nagar West,<br />
                Chennai – 600040
              </li>
              <li>
                <a href="mailto:support@thecos.com" className="hover:text-brand-blue transition-colors font-medium">support@thecos.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t mt-12 pt-8 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className={`text-xs text-center md:text-left ${isDark ? 'text-muted' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} THECOS. All rights reserved. <span className="mx-2">|</span> GSTIN: 33AAIAT2044E1ZU <span className="mx-2">|</span> LEI: 3358004B6E98BGWE1P16
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/thecos" target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50 text-brand-teal'}`}>
                Facebook
              </a>
              <a href="https://www.instagram.com/thecos" target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50 text-brand-teal'}`}>
                Instagram
              </a>
              <a href="https://www.youtube.com/@thecos" target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50 text-brand-teal'}`}>
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
