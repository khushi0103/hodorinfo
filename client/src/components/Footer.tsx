import { Link } from 'wouter';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24">
      {/* 1. Curved Background Layer */}
      <div className="bg-gradient-to-b from-[#110d1f] to-[#07050a] rounded-t-[50px] md:rounded-t-[100px] pt-24 pb-12 px-6 md:px-20 border-t border-white/5">

        <div className="max-w-7xl mx-auto">

          {/* 2. CENTERED LOGO: Logo ko upar move kar diya hai (No description) */}
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-tighter uppercase font-display">HodorInfo</span>
            </div>
          </div>

          {/* 3. MAIN GRID: 4 Columns with vertical dividers */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-t border-white/5 pt-16">

            {/* Contact Details */}
            <div className="md:border-r border-white/10 pr-6">
              <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8 opacity-80">Contact Details</h4>
              <div className="space-y-4 text-sm">
                <a href="tel:+1234567890" className="text-white/50 hover:text-purple-400 transition-colors block">
                  +1 (234) 567-890
                </a>
                <a href="mailto:info@hodorinfo.com" className="text-white/50 hover:text-purple-400 transition-colors block">
                  info@hodorinfo.com
                </a>
              </div>
            </div>

            {/* Office Location */}
            <div className="md:border-r border-white/10 px-0 md:px-6">
              <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8 opacity-80">Office Location</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Innovation Hub, Tech City,<br />
                Faridabad, HR 121004
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:border-r border-white/10 px-0 md:px-6">
              <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8 opacity-80">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {['Home', 'Services', 'Industries', 'About'].map((item) => (
                  <li key={item}>
                    <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>
                      <a className="text-white/50 hover:text-white transition-colors">{item}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources (Wapis add kar diya hai) */}
            <div className="px-0 md:px-6">
              <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8 opacity-80">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-white/50 hover:text-white transition-colors">Blog</a></li>
                <li><Link href="/contact"><a className="text-white/50 hover:text-white transition-colors">Contact</a></Link></li>
                <li><a href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* 4. BOTTOM SECTION: Socials aur Copyright center mein */}
          <div className="flex flex-col items-center justify-center space-y-8 border-t border-white/5 pt-12">

            {/* Social Icons */}
            <div className="flex gap-8 items-center text-white/40">
              <a href="#" className="hover:text-white transition-all hover:-translate-y-1"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-all hover:-translate-y-1"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-all hover:-translate-y-1"><Github size={20} /></a>
            </div>

            {/* Copyright & Credits exactly like Maydiv center align */}
            <div className="text-center space-y-2">
              <p className="text-white/30 text-[11px] uppercase tracking-[0.2em]">
                © {currentYear} HodorInfo. All rights reserved.
              </p>
              <p className="text-white/20 text-[10px] uppercase tracking-[0.15em] font-medium">
                Crafted by HodorInfo Infotech
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}