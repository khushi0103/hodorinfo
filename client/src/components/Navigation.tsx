import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, Cpu, Bot, Plane, Shield, BarChart3, Zap, ArrowRight } from 'lucide-react';

// ─── Services mega-menu data ───────────────────────────────────────────────
const services = [
  {
    icon: Cpu,
    label: 'Enterprise Software',
    desc: 'Custom platforms for complex workflows',
    href: '/services#service-1',
    color: '#00d4ff',
  },
  {
    icon: Bot,
    label: 'AI & Machine Learning',
    desc: 'Intelligent agents & predictive models',
    href: '/services#service-2',
    color: '#a78bfa',
  },
  {
    icon: Plane,
    label: 'Drone Technology',
    desc: 'Industrial aerial systems & monitoring',
    href: '/services#service-3',
    color: '#34d399',
  },
  {
    icon: Shield,
    label: 'Cybersecurity',
    desc: 'Aerospace & drone threat protection',
    href: '/services#service-4',
    color: '#fb923c',
  },
  {
    icon: BarChart3,
    label: 'Data Science',
    desc: 'Advanced analytics & data engineering',
    href: '/services#service-5',
    color: '#f472b6',
  },
  {
    icon: Zap,
    label: 'Digital Transformation',
    desc: 'End-to-end modernization consulting',
    href: '/services#service-6',
    color: '#facc15',
  },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: 'https://blog.hodorinfo.com', external: true },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [location] = useLocation();
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const el = document.documentElement;
      const prog = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(Math.min(prog, 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close mobile menu on route change ────────────────────────────────────
  useEffect(() => {
    setIsOpen(false);
    setMegaOpen(false);
  }, [location]);

  // ── Close mega-menu when clicking outside ────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        megaTriggerRef.current &&
        !megaTriggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMegaEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <>
      {/* ── Scroll Progress Bar ──────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[60] transition-all duration-150"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #00d4ff, #a78bfa, #00d4ff)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
          opacity: scrollProgress > 2 ? 1 : 0,
        }}
      />

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: '#0a0e27',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)', // Added a subtle bottom border for definition
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          padding: '0',
        }}
      >
        <div className="container mx-auto px-6">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: '84px' }}
          >
            {/* ── Logo ─────────────────────────────────────────────────── */}
            <Link href="/" className="flex items-center group" style={{ gap: '10px', textDecoration: 'none' }}>
              <div
                className="flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #d946ef 100%)',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                  flexShrink: 0,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <span
                  style={{
                    fontWeight: 800,
                    color: '#ffffff',
                    fontSize: '20px',
                    lineHeight: 1,
                    transition: 'none',
                  }}
                >
                  H
                </span>
              </div>
              <span
                style={{
                  fontWeight: 800,
                  color: '#ffffff',
                  fontSize: '22px',
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
                className="hidden sm:inline font-display"
              >
                HodorInfo
              </span>
            </Link>

            {/* ── Desktop Links ────────────────────────────────────────── */}
            <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const hovered = hoveredLink === link.label;
                const showLine = active || hovered;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      style={{ position: 'relative', paddingBottom: '6px' }}
                      onMouseEnter={() => { handleMegaEnter(); setHoveredLink(link.label); }}
                      onMouseLeave={() => { handleMegaLeave(); setHoveredLink(null); }}
                    >
                      <a
                        ref={megaTriggerRef as any}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          window.history.pushState({}, '', link.href);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                          setMegaOpen(false);
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          fontSize: '18px',
                          fontWeight: 500,
                          color: '#ffffff',
                          background: megaOpen ? 'rgba(0,212,255,0.08)' : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          transition: 'background 0.2s, color 0.2s',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          style={{
                            transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s',
                          }}
                        />
                      </a>
                      <span
                        style={{
                          display: 'block',
                          position: 'absolute',
                          bottom: 0,
                          left: '16px',
                          right: '16px',
                          height: '2px',
                          borderRadius: '99px',
                          background: 'linear-gradient(90deg, #00d4ff, #a78bfa)',
                          transform: showLine ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left center',
                          opacity: showLine ? 1 : 0,
                          transition: 'transform 0.25s ease, opacity 0.25s ease',
                        }}
                      />
                    </div>
                  );
                }

                if (link.external) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        position: 'relative',
                        display: 'inline-block',
                        padding: '10px 12px 12px',
                        borderRadius: '8px',
                        fontSize: '18px',
                        fontWeight: 500,
                        color: '#ffffff',
                        textDecoration: 'none',
                        background: 'transparent',
                        transition: 'background 0.2s, color 0.2s',
                        letterSpacing: '0.01em',
                      }}
                      onMouseEnter={(e) => {
                        setHoveredLink(link.label);
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                      }}
                      onMouseLeave={(e) => {
                        setHoveredLink(null);
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      {link.label}
                      <span
                        style={{
                          display: 'block',
                          position: 'absolute',
                          bottom: '2px',
                          left: '14px',
                          right: '14px',
                          height: '2px',
                          borderRadius: '99px',
                          background: 'linear-gradient(90deg, #00d4ff, #a78bfa)',
                          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left center',
                          opacity: hovered ? 1 : 0,
                          transition: 'transform 0.25s ease, opacity 0.25s ease',
                        }}
                      />
                    </a>
                  );
                }

                // Internal link — plain <a> with wouter href, no Link wrapper
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', link.href); window.dispatchEvent(new PopStateEvent('popstate')); }}
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      padding: '10px 12px 12px',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#ffffff',
                      textDecoration: 'none',
                      background: active ? 'rgba(0,212,255,0.06)' : 'transparent',
                      transition: 'background 0.2s, color 0.2s',
                      cursor: 'pointer',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={(e) => {
                      setHoveredLink(link.label);
                      if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      setHoveredLink(null);
                      if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    {link.label}
                    <span
                      style={{
                        display: 'block',
                        position: 'absolute',
                        bottom: '2px',
                        left: '14px',
                        right: '14px',
                        height: '2px',
                        borderRadius: '99px',
                        background: 'linear-gradient(90deg, #00d4ff, #a78bfa)',
                        transform: showLine ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left center',
                        opacity: showLine ? 1 : 0,
                        transition: 'transform 0.25s ease, opacity 0.25s ease',
                      }}
                    />
                  </a>
                );
              })}
            </div>

            {/* ── CTA Button ───────────────────────────────────────────── */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0a0e27] transition-all duration-300 hover:scale-105 group"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%)',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                }}
                onMouseEnter={(e: any) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 32px rgba(0, 212, 255, 0.55)';
                }}
                onMouseLeave={(e: any) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 20px rgba(0, 212, 255, 0.3)';
                }}
              >
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                  }}
                />
                Get Started
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* ── Mobile Hamburger ─────────────────────────────────────── */}
            <button
              onClick={() => setIsOpen((p) => !p)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                background: isOpen ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                border: '1px solid',
                borderColor: isOpen ? 'rgba(0, 212, 255, 0.3)' : 'rgba(45, 53, 97, 0.6)',
              }}
              aria-label="Toggle menu"
            >
              <span
                className="transition-all duration-300"
                style={{ color: '#00d4ff', opacity: isOpen ? 0 : 1, position: 'absolute' }}
              >
                <Menu size={20} />
              </span>
              <span
                className="transition-all duration-300"
                style={{ color: '#00d4ff', opacity: isOpen ? 1 : 0, position: 'absolute' }}
              >
                <X size={20} />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mega Menu ──────────────────────────────────────────────────── */}
        <div
          ref={megaRef}
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleMegaLeave}
          className="absolute left-0 right-0 overflow-hidden"
          style={{
            top: 'calc(100% + 12px)',
            maxHeight: megaOpen ? '400px' : '0px',
            opacity: megaOpen ? 1 : 0,
            pointerEvents: megaOpen ? 'auto' : 'none',
            transition: 'max-height 0.3s ease, opacity 0.25s ease',
          }}
        >
          <div
            style={{
              background: 'rgba(10, 14, 39, 0.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 212, 255, 0.1)',
              borderRadius: '20px',
              boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}
          >
            <div className="container mx-auto px-6 py-5">
              {/* ── Tab bar — Maydiv style ── */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                {services.map((svc) => {
                  const Icon = svc.icon;
                  return (
                    <a
                      key={svc.label}
                      href={svc.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const wasAlreadyOnServices = window.location.pathname === '/services';
                        window.history.pushState({}, '', svc.href);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                        setMegaOpen(false);

                        // If we were already on the services page, the hash change alone might not trigger the scroll
                        // so we manually trigger it if needed
                        if (wasAlreadyOnServices && svc.href.includes('#')) {
                          const hash = svc.href.split('#')[1];
                          const element = document.getElementById(hash);
                          if (element) {
                            element.scrollIntoView({ behavior: 'auto', block: 'start' });
                          }
                        }
                      }}
                      style={{
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px 14px',
                        borderRadius: '12px',
                        fontSize: '17px',
                        fontWeight: 500,
                        color: '#e0e0e0',
                        textDecoration: 'none',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                        userSelect: 'none',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'translateY(-3px)';
                        el.style.background = `${svc.color}12`;
                        el.style.borderColor = `${svc.color}40`;
                        el.style.boxShadow = `0 8px 24px ${svc.color}18`;
                        el.style.color = '#ffffff';
                        // show underline
                        const line = el.querySelector('.svc-line') as HTMLElement;
                        if (line) { line.style.transform = 'scaleX(1)'; line.style.opacity = '1'; }
                        // show icon glow
                        const iconWrap = el.querySelector('.svc-icon') as HTMLElement;
                        if (iconWrap) iconWrap.style.background = `${svc.color}30`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'translateY(0)';
                        el.style.background = 'rgba(255,255,255,0.04)';
                        el.style.borderColor = 'rgba(255,255,255,0.07)';
                        el.style.boxShadow = 'none';
                        el.style.color = '#e0e0e0';
                        const line = el.querySelector('.svc-line') as HTMLElement;
                        if (line) { line.style.transform = 'scaleX(0)'; line.style.opacity = '0'; }
                        const iconWrap = el.querySelector('.svc-icon') as HTMLElement;
                        if (iconWrap) iconWrap.style.background = `${svc.color}15`;
                      }}
                    >
                      {/* Icon */}
                      <span
                        className="svc-icon"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '7px',
                          background: `${svc.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'background 0.2s ease',
                        }}
                      >
                        <Icon size={14} style={{ color: svc.color }} />
                      </span>

                      {/* Label */}
                      {svc.label}

                      {/* Underline — Maydiv style */}
                      <span
                        className="svc-line"
                        style={{
                          display: 'block',
                          position: 'absolute',
                          bottom: '3px',
                          left: '12px',
                          right: '12px',
                          height: '2px',
                          borderRadius: '99px',
                          background: `linear-gradient(90deg, ${svc.color}, ${svc.color}88)`,
                          transform: 'scaleX(0)',
                          transformOrigin: 'left center',
                          opacity: 0,
                          transition: 'transform 0.22s ease, opacity 0.22s ease',
                        }}
                      />
                    </a>
                  );
                })}
              </div>

              {/* View all link */}
              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, '', '/services');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    setMegaOpen(false);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#00d4ff',
                    textDecoration: 'none',
                    transition: 'gap 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '10px'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '6px'; }}
                >
                  View all services
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ───────────────────────────────────────────────── */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? '520px' : '0px',
            opacity: isOpen ? 1 : 0,
            borderTop: isOpen ? '1px solid rgba(45, 53, 97, 0.5)' : 'none',
          }}
        >
          <div
            className="px-6 py-5 flex flex-col gap-1"
            style={{ background: 'rgba(10, 14, 39, 0.98)' }}
          >
            {navLinks.map((link, i) => {
              const active = isActive(link.href);

              if (link.hasDropdown) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen((p) => !p)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        color: active ? '#00d4ff' : '#a0a0a0',
                        background: active ? 'rgba(0, 212, 255, 0.06)' : 'transparent',
                        animationDelay: `${i * 40}ms`,
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200"
                        style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                      />
                    </button>
                    {/* Mobile services list */}
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: mobileServicesOpen ? '400px' : '0px' }}
                    >
                      <div className="pl-4 pb-2 flex flex-col gap-1">
                        {services.map((svc) => {
                          const Icon = svc.icon;
                          return (
                            <Link
                              key={svc.label}
                              href={svc.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#8a8a8a] hover:text-[#e0e0e0] transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <Icon size={14} style={{ color: svc.color }} />
                              {svc.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-3 rounded-xl text-sm font-medium text-[#a0a0a0] hover:text-[#e0e0e0] hover:bg-white/5 transition-all duration-200"
                  style={{ animationDelay: `${i * 40}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: active ? '#00d4ff' : '#a0a0a0',
                    background: active ? 'rgba(0, 212, 255, 0.06)' : 'transparent',
                    animationDelay: `${i * 40}ms`,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile CTA */}
            <Link
              href="/contact"
              className="mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#0a0e27] transition-all duration-300 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%)',
                boxShadow: '0 0 24px rgba(0, 212, 255, 0.3)',
              }}
              onClick={() => setIsOpen(false)}
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Shimmer keyframe injected once ────────────────────────────────── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </>
  );
}