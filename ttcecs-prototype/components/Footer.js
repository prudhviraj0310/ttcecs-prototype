export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/6 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center font-black text-white shadow-lg">
                TC
              </div>
              <span className="font-black text-xl text-electric">THECOS</span>
            </div>
            <p className="text-sm text-muted mb-4">
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
              <li><a href="/deposits" className="hover:text-electric transition-colors">Deposits</a></li>
              <li><a href="/loans" className="hover:text-electric transition-colors">Loans</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-electric font-semibold mb-4">More</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/subsidiaries" className="hover:text-electric transition-colors">Subsidiaries</a></li>
              <li><a href="/news" className="hover:text-electric transition-colors">News</a></li>
              <li><a href="/downloads" className="hover:text-electric transition-colors">Downloads</a></li>
              <li><a href="/faqs" className="hover:text-electric transition-colors">FAQs</a></li>
              <li><a href="/contact" className="hover:text-electric transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-electric font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <strong className="text-electric">Head Office:</strong><br />
                No. 1735, 18th Main Road,<br />
                Anna Nagar West, Chennai – 600040
              </li>
              <li>
                <strong className="text-electric">Phone:</strong><br />
                <a href="tel:+919025947007" className="hover:text-electric transition-colors">+91 90259 47007</a>
              </li>
              <li>
                <strong className="text-electric">Email:</strong><br />
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
