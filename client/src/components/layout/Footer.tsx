import { Link } from 'wouter';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 px-4 md:px-8">
      {/* Broad & Very Rounded Background with Pink/Purple Glassy Effect */}
      <div 
        className="backdrop-blur-3xl rounded-t-[40px] md:rounded-t-[100px] pt-12 pb-8 px-6 md:px-16 shadow-[0_-30px_80px_rgba(99,103,255,0.25)] border-t border-white/12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.02) 0%, rgba(10, 14, 39, 0.3) 50%, rgba(10, 14, 39, 0.45) 100%)',
        }}
      >
        <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />

        <div className="max-w-[1500px] mx-auto">

          {/* Centered Logo Above Grid - Shorter Margin */}
          <div className="flex flex-col items-center justify-center mb-10 mt-2">
            <div className="flex items-center gap-4 group cursor-default">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500"
                style={{
                  background: 'linear-gradient(135deg, #6367FF 0%, #8494FF 100%)',
                  boxShadow: '0 0 24px rgba(99, 103, 255, 0.45)',
                }}
              >
                <span className="text-white font-bold text-2xl font-display">H</span>
              </div>
              <span
                className="font-extrabold text-3xl tracking-[0.01em] uppercase font-display"
                style={{
                  background: 'linear-gradient(90deg, #6367FF 0%, #8494FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                HodorInfo
              </span>
            </div>
          </div>

          {/* MAIN BROAD GRID: 4 Columns with Dividers - Shorter Margin */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-10 pt-6">

            {/* Column 1: Contact Info */}
            <div className="md:border-r border-white/10 px-6 md:px-12 lg:px-16 space-y-4">
              <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-6 text-center md:text-left">Contact Info</h4>
              <div className="space-y-4">
                {/* Interactive Address Block */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 group cursor-pointer">
                  <MapPin className="text-white/40 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" size={18} />
                  <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium group-hover:text-white transition-colors">
                    Innovation Hub, Tech City,<br />
                    Faridabad, HR 121004
                  </p>
                </div>
                <a href="tel:+1234567890" className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                  <Phone className="text-white/40 flex-shrink-0 group-hover:text-white transition-colors" size={18} />
                  <span className="text-white/40 text-sm md:text-base font-medium group-hover:text-white transition-colors">+1 (234) 567-890</span>
                </a>
                <a href="mailto:info@hodorinfo.com" className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                  <Mail className="text-white/40 flex-shrink-0 group-hover:text-white transition-colors" size={18} />
                  <span className="text-white/40 text-sm md:text-base font-medium group-hover:text-white transition-colors">info@hodorinfo.com</span>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:border-r border-white/10 px-6 md:px-12 lg:px-16 text-center md:text-left">
              <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-8 text-center md:text-left">Quick Links</h4>
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
            <div className="md:border-r border-white/10 px-6 md:px-12 lg:px-16 text-center md:text-left">
              <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-8 text-center md:text-left">Resources</h4>
              <ul className="space-y-4 text-sm md:text-base font-medium text-white/40">
                <li><a href="https://blog.hodorinfo.com" className="hover:text-white transition-all hover:translate-x-1 inline-block">Blog</a></li>
                <li><Link href="/contact" className="hover:text-white transition-all hover:translate-x-1 inline-block">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-all hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-all hover:translate-x-1 inline-block">Terms of Service</a></li>
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div className="px-6 md:px-12 lg:px-16 text-center md:text-left">
              <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-8 text-center md:text-left">Follow Us</h4>
              <div className="flex gap-8 items-center justify-center md:justify-start">
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
