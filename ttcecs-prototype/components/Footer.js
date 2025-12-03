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

  return (
    <footer className="bg-transparent border-t border-white/6 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="THECOS Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-black text-xl text-electric">THECOS</span>
            </div>
            <p className="text-sm text-muted mb-4 max-w-sm">
              Thiruvalluvar Transport Corporation Employees' Co-operative Credit Society Ltd.
            </p>
            <p className="text-sm text-muted">
              Empowering Members Since 1991
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-electric font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/" className="hover:text-electric transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-electric transition-colors">About Us</a></li>
              <li><a href="/membership" className="hover:text-electric transition-colors">Membership</a></li>
              <li><a href="/loans" className="hover:text-electric transition-colors">Loans</a></li>
              <li><a href="/downloads" className="hover:text-electric transition-colors">Downloads</a></li>
            </ul>
          </div>

          {/* Branch Hotlines */}
          <div>
            <h4 className="text-electric font-semibold mb-4">Branch Hotlines</h4>
            <ul className="space-y-2 text-sm text-muted">
              {branches.map((branch) => (
                <li key={branch.name} className="flex justify-between gap-4">
                  <span>{branch.name}:</span>
                  <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="hover:text-electric transition-colors whitespace-nowrap">
                    {branch.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-electric font-semibold mb-4">Head Office</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                No. 1735, 18th Main Road,<br />
                Anna Nagar West,<br />
                Chennai – 600040
              </li>
              <li>
                <a href="mailto:support@thecos.com" className="hover:text-electric transition-colors">support@thecos.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/6 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted text-center md:text-left">
              © {new Date().getFullYear()} THECOS. All rights reserved. | GSTIN: 33AAIAT2044E1ZU | LEI: 3358004B6E98BGWE1P16
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/thecos" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-electric">
                Facebook
              </a>
              <a href="https://www.instagram.com/thecos" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-electric">
                Instagram
              </a>
              <a href="https://www.youtube.com/@thecos" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-electric">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
