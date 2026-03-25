import { Link } from 'wouter';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 px-4 md:px-8">
      {/* Broad & Very Rounded Background with Pink/Purple Glassy Effect */}
      <div className="bg-gradient-to-br from-[#0a0e27]/90 via-[#1a0b3a]/85 to-[#0a0e27]/90 backdrop-blur-3xl rounded-t-[80px] md:rounded-t-[100px] pt-12 pb-8 px-6 md:px-16 shadow-[0_-30px_80px_rgba(155,93,245,0.2)]">

        <div className="max-w-[1500px] mx-auto">

          {/* Centered Logo Above Grid - Shorter Margin */}
          <div className="flex flex-col items-center justify-center mb-10 mt-2">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-12 h-12 bg-gradient-to-br from-[#06b6d4] via-[#3b82f6] to-[#d946ef] rounded-xl flex items-center justify-center shadow-xl shadow-cyan-500/30 transform group-hover:scale-110 transition-transform duration-500">
                <span className="text-white font-bold text-2xl font-display">H</span>
              </div>
              <span className="text-white font-extrabold text-3xl tracking-[0.01em] uppercase font-display">HodorInfo</span>
            </div>
          </div>

          {/* MAIN BROAD GRID: 4 Columns with Dividers - Shorter Margin */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-10 pt-6">

            {/* Column 1: Contact Info */}
            <div className="md:border-r border-white/10 px-6 md:px-12 lg:px-16 space-y-4">
              <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-6">Contact Info</h4>
              <div className="space-y-4">
                {/* Interactive Address Block */}
                <div className="flex items-start gap-4 group cursor-pointer">
                  <MapPin className="text-white/40 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" size={18} />
                  <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium group-hover:text-white transition-colors">
                    Innovation Hub, Tech City,<br />
                    Faridabad, HR 121004
                  </p>
                </div>
                <a href="tel:+1234567890" className="flex items-center gap-4 group">
                  <Phone className="text-white/40 flex-shrink-0 group-hover:text-white transition-colors" size={18} />
                  <span className="text-white/40 text-sm md:text-base font-medium group-hover:text-white transition-colors">+1 (234) 567-890</span>
                </a>
                <a href="mailto:info@hodorinfo.com" className="flex items-center gap-4 group">
                  <Mail className="text-white/40 flex-shrink-0 group-hover:text-white transition-colors" size={18} />
                  <span className="text-white/40 text-sm md:text-base font-medium group-hover:text-white transition-colors">info@hodorinfo.com</span>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:border-r border-white/10 px-6 md:px-12 lg:px-16">
              <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-8">Quick Links</h4>
              <ul className="space-y-4 text-sm md:text-base font-medium">
                {['Home', 'Services', 'Industries', 'About'].map((item) => (
                  <li key={item}>
                    <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-white/40 hover:text-white transition-all hover:translate-x-1 inline-block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="md:border-r border-white/10 px-6 md:px-12 lg:px-16">
              <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-8">Resources</h4>
              <ul className="space-y-4 text-sm md:text-base font-medium text-white/40">
                <li><a href="#" className="hover:text-white transition-all hover:translate-x-1 inline-block">Blog</a></li>
                <li><Link href="/contact" className="hover:text-white transition-all hover:translate-x-1 inline-block">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-all hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-all hover:translate-x-1 inline-block">Terms of Service</a></li>
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div className="px-6 md:px-12 lg:px-16">
              <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-8">Follow Us</h4>
              <div className="flex gap-8 items-center">
                <a href="#" className="text-white/40 hover:text-white transition-all hover:-translate-y-2"><Linkedin size={22} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-all hover:-translate-y-2"><Twitter size={22} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-all hover:-translate-y-2"><Github size={22} /></a>
              </div>
            </div>
          </div>

          {/* BOTTOM COPYRIGHT - COMPACT */}
          <div className="flex flex-col items-center justify-center space-y-2 pt-6">
            <p
              className="uppercase tracking-[0.3em] text-center"
              style={{ fontSize: '13px', lineHeight: '1.2', color: 'rgba(255, 255, 255, 0.6)' }}
            >
              © {currentYear} HodorInfo. All rights reserved.
            </p>
            <p
              className="uppercase tracking-[0.15em] hidden md:block text-center"
              style={{ fontSize: '11px', marginTop: '4px', color: 'rgba(255, 255, 255, 0.4)' }}
            >
              Crafting Digital Excellence for Enterprise Innovation
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
