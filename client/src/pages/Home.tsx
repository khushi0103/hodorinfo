import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StaticFrameContentLoop from '@/components/ui/StaticFrameContentLoop'; // Main Maydiv Component
import { ArrowRight, Zap, Brain, Plane, Shield, BarChart3, Cog, ChevronRight, Sparkles } from 'lucide-react';

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouse = { x: -1000, y: -1000 };
    let lastMouse = { x: -1000, y: -1000 };
    let mouseSpeed = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      lastMouse = { ...mouse };
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (lastMouse.x !== -1000) {
        const dx = mouse.x - lastMouse.x;
        const dy = mouse.y - lastMouse.y;
        mouseSpeed = Math.min(Math.hypot(dx, dy), 120);
      }
    };
    const handleMouseLeave = () => { mouse = { x: -1000, y: -1000 }; lastMouse = { x: -1000, y: -1000 }; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;
    const pts: { x: number; y: number; bx: number; by: number; vx: number; vy: number; r: number; energy: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      pts.length = 0;
      for (let i = 0; i < 80; i++) {
        const bx = (Math.random() - 0.5) * 0.4;
        const by = (Math.random() - 0.5) * 0.4;
        pts.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          bx, by, vx: bx, vy: by,
          r: Math.random() * 2 + 1,
          energy: 0
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      mouseSpeed *= 0.90;

      pts.forEach((p) => {
        p.vx = p.vx * 0.95 + p.bx * 0.05;
        p.vy = p.vy * 0.95 + p.by * 0.05;
        p.x += p.vx; p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) { p.bx *= -1; p.vx *= -1; }
        if (p.y < 0 || p.y > canvas.height) { p.by *= -1; p.vy *= -1; }

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 180 && mouseSpeed > 5) {
          p.energy = Math.min(p.energy + (mouseSpeed / 100), 1);
          const force = (180 - dist) / 180;
          p.vx += (dx / dist) * force * (mouseSpeed * 0.03);
          p.vy += (dy / dist) * force * (mouseSpeed * 0.03);
        }

        p.energy = Math.max(0, p.energy - 0.015);
        const r = Math.floor(0 + (255 - 0) * p.energy);
        const g = Math.floor(212 + (61 - 212) * p.energy);
        const b = 255;

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.45 + p.energy * 0.5})`;
        ctx.fill();

        if (dist < 150) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.2 * (1 - dist / 150) + p.energy * 0.4})`;
          ctx.lineWidth = 1 + p.energy * 1.5;
          ctx.stroke();
        }
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 130) {
            const avgEnergy = (pts[i].energy + pts[j].energy) / 2;
            const r = Math.floor(0 + (255 - 0) * avgEnergy);
            const g = Math.floor(212 + (61 - 212) * avgEnergy);
            const b = 255;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.12 * (1 - d / 130) + avgEnergy * 0.3})`;
            ctx.lineWidth = 0.6 + avgEnergy * 1.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

function StarField() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[...Array(40)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`, background: '#ffffff', borderRadius: '50%', opacity: Math.random() * 1.5 + 0.1, boxShadow: '0 0 10px #ffffff' }} className="animate-pulse" />
      ))}
    </div>
  );
}

function HorizonGlow() {
  return (
    <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', right: '-10%', height: '60%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '160%', height: '100%', background: 'radial-gradient(ellipse at bottom, rgba(0, 212, 255, 0.2) 0%, rgba(0, 168, 204, 0.08) 40%, transparent 75%)', filter: 'blur(120px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '20%', width: '70%', height: '90%', background: 'radial-gradient(circle, rgba(155, 93, 245, 0.12) 0%, transparent 70%)', filter: 'blur(140px)' }} />
    </div>
  );
}

function PulsingBadge() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '8px 18px', borderRadius: '100px', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.2)', marginBottom: '32px', backdropFilter: 'blur(8px)' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d4ff', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: '#00d4ff', opacity: 0.4, animation: 'pulse-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
      </div>
      <span style={{ fontSize: '14px', fontWeight: 600, color: '#00d4ff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Next-Level Enterprise Technology</span>
    </div>
  );
}

function HeroImage() {
  return (
    <div style={{ transition: 'transform 0.1s ease-out', width: '100%', maxWidth: '820px', margin: '0 auto' }}>
      <div style={{ position: 'relative', width: '100%', animation: 'heroFloat 5s ease-in-out infinite' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', border: '1px solid rgba(0, 212, 255, 0.1)', borderRadius: '50%', animation: 'rotateClockwise 30s linear infinite', zIndex: 1 }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '135%', height: '135%', border: '1px dashed rgba(167, 139, 250, 0.1)', borderRadius: '50%', animation: 'rotateCounterClockwise 45s linear infinite', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '0%', right: '0%', height: '80%', background: 'radial-gradient(ellipse, rgba(155,93,245,0.3) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
          <div style={{ position: 'relative', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
            <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 90%)', maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 90%)' }}>
              <img src="/Image.png" alt="Hero representation" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', opacity: 0.95, mixBlendMode: 'lighten', filter: 'blur(0.5px)' }} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)', zIndex: 3 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MagneticButton({ href, primary, label }: { href: string; primary: boolean; label: string }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={href}>
      <a onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px 36px', background: 'transparent', borderRadius: '100px', position: 'relative', zIndex: 10, cursor: 'pointer', textDecoration: 'none', fontWeight: 600, fontSize: '18px', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)', transform: isHovered ? 'translateY(-2px)' : 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '100px', border: '2px solid rgba(255,255,255,0.9)', opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '100px', padding: '2px', background: 'linear-gradient(90deg, #ff3dff, #b026ff, #00d4ff)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', inset: -2, borderRadius: '100px', background: 'linear-gradient(90deg, #ff3dff, #b026ff, #00d4ff)', opacity: isHovered ? 0.3 : 0, filter: 'blur(12px)', transition: 'opacity 0.3s ease', zIndex: -1 }} />
        <span style={{ position: 'relative' }}>
          <span style={{ color: '#ffffff', opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }}>{label}</span>
          <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', background: 'linear-gradient(90deg, #ff3dff, #b026ff, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>{label}</span>
        </span>
      </a>
    </Link>
  );
}

const services = [
  { icon: Cog, title: 'Enterprise Software', desc: 'Next-generation platforms that automate and optimize complex business processes across any industry.', color: '#00d4ff' },
  { icon: Brain, title: 'AI & Machine Learning', desc: 'Deploy intelligent agents and ML models to automate decision-making and predictive analytics.', color: '#a78bfa' },
  { icon: Plane, title: 'Drone Technology', desc: 'Design, deploy, and manage drone systems for industrial applications and aerial solutions.', color: '#34d399' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Specialized protection for drones, satellites, and critical aerospace systems.', color: '#fb923c' },
  { icon: BarChart3, title: 'Data Science', desc: 'Extract insights and drive decisions with advanced analytics and data engineering.', color: '#f472b6' },
  { icon: Zap, title: 'Digital Transformation', desc: 'Guide organizations through comprehensive modernization and technology integration.', color: '#facc15' },
];

const industries = [
  { name: 'Logistics & Supply Chain', icon: '🚚' },
  { name: 'Agriculture', icon: '🌾' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Manufacturing', icon: '🏭' },
  { name: 'Retail & E-commerce', icon: '🛍️' },
  { name: 'Energy & Utilities', icon: '⚡' },
  { name: 'Finance & Banking', icon: '🏦' },
  { name: 'Government & Defense', icon: '🏛️' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <style>{`
        @keyframes animatedTextGradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes fadeUpReveal { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .premium-gradient-text { background: linear-gradient(90deg, #ffffff, #ff3dff, #b026ff, #00d4ff, #ffffff); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; animation: animatedTextGradient 8s linear infinite; display: block; width: fit-content; }
        .reveal-delay-1 { animation: fadeUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; animation-delay: 0.1s; }
        .reveal-delay-2 { animation: fadeUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; animation-delay: 0.3s; }
        .reveal-delay-3 { animation: fadeUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; animation-delay: 0.5s; }
        .reveal-delay-4 { animation: fadeUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; animation-delay: 0.7s; }
      `}</style>

      <Navigation />

      {/* HERO SECTION */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '80px', paddingBottom: '80px', minHeight: '90vh', display: 'flex', alignItems: 'center', background: '#0a0e27' }}>
        <StarField />
        <HorizonGlow />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663026809090/hnrrSqkFZFAiwHyMRLF6Qv/hodor-hero-tech-background-LdQqcCh7PBcqhdmaDGgBHk.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.04 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,39,0.8) 0%, rgba(10,14,39,0.4) 50%, rgba(10,14,39,0.8) 100%)' }} />
        </div>
        <ParticleCanvas />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '0 5%' }}>
          <div style={{ maxWidth: '1800px', margin: '0 auto', padding: '40px 0', position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 600px', maxWidth: '1050px' }}>
              <div className="reveal-delay-1"><PulsingBadge /></div>
              <h1 className="reveal-delay-2" style={{ fontSize: 'clamp(32px, 4.8vw, 76px)', fontWeight: 500, lineHeight: 1.05, marginBottom: '28px', fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em' }}>
                <span className="premium-gradient-text" style={{ paddingRight: '20px' }}>Transform Any Industry</span>
                <span className="premium-gradient-text" style={{ paddingRight: '20px' }}>with Next-Level</span>
                <span className="premium-gradient-text" style={{ paddingRight: '20px', paddingBottom: '12px' }}>Technology</span>
              </h1>
              <p className="reveal-delay-3" style={{ fontSize: '20px', color: '#ffffff', lineHeight: 1.8, maxWidth: '640px', marginBottom: '48px', fontWeight: 400 }}>
                HodorInfo specializes in digital transformation across all industries. We combine enterprise software, AI, drones, cybersecurity, and data science to revolutionize how businesses operate.
              </p>
              <div className="reveal-delay-4" style={{ display: 'flex', gap: '32px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <MagneticButton label="Get started" href="/contact" primary={true} />
                <MagneticButton label="Our Services" href="/services" primary={false} />
              </div>
            </div>
            <div style={{ flex: '1 1 400px', maxWidth: '600px', position: 'relative', width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '0 auto' }}>
              <HeroImage />
            </div>
          </div>
        </div>
      </section>

      {/* CORE COMPETENCIES SECTION - MAYDIV STYLE (Static Frames + Moving Content) */}
      <section style={{ padding: '100px 0 0', background: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#ffffff', fontFamily: "'Poppins', sans-serif", marginBottom: '16px', letterSpacing: '-0.02em' }}>Our Core Competencies</h2>
            <p style={{ fontSize: '18px', color: 'rgba(224,224,224,0.7)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>Six interconnected technology pillars enabling industry transformation</p>
          </div>

          {/* This is where the fixed frames with looping content live */}
          <StaticFrameContentLoop data={services} />

        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: '14px' }}>Industries</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', fontFamily: "'Poppins', sans-serif", marginBottom: '14px' }}>Industries We Transform</h2>
            <p style={{ fontSize: '16px', color: 'rgba(224,224,224,0.6)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>From logistics to healthcare, we bring digital innovation to every sector</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
            {industries.map((ind, i) => (
              <div key={i}
                style={{ padding: '20px 18px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', gap: '12px' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.background = 'rgba(0,212,255,0.06)'; el.style.borderColor = 'rgba(0,212,255,0.3)'; el.style.boxShadow = '0 12px 32px rgba(0,212,255,0.12)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{ind.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#e0e0e0' }}>{ind.name}</span>
                <ChevronRight size={14} style={{ marginLeft: 'auto', color: 'rgba(0,212,255,0.5)', flexShrink: 0 }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/industries">
              <a style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#00d4ff', textDecoration: 'none', transition: 'gap 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '12px'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '8px'; }}
              >View All Industries <ArrowRight size={16} /></a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '80px 0', display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '1000px', borderRadius: '40px', background: 'linear-gradient(135deg, #d946ef 0%, #8b5cf6 50%, #4f46e5 100%)', padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(139, 92, 246, 0.25)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
              <Sparkles size={14} color="rgba(255,255,255,0.5)" fill="currentColor" />
              <Sparkles size={20} color="#ffffff" fill="currentColor" style={{ transform: 'translateY(-6px)' }} />
              <Sparkles size={14} color="rgba(255,255,255,0.5)" fill="currentColor" />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', marginBottom: '24px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Let's work together</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#ffffff', fontFamily: "'Poppins', sans-serif", lineHeight: 1.25, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>
              Ready to Transform<br />Your Industry?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.75, position: 'relative', zIndex: 1 }}>
              Let's discuss how HodorInfo can revolutionize your business with next-level technology solutions.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <Link href="/contact">
                <a className="shine-btn"
                  style={{ padding: '16px 40px', borderRadius: '99px', background: '#0a0a0a', color: '#ffffff', fontWeight: 600, fontSize: '15px', textDecoration: 'none', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '160px', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  Schedule a Consultation <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .heading-line-1 { display: inline-block; background: linear-gradient(90deg, #ff72e1, #c084fc, #818cf8, #38bdf8, #c084fc, #ff72e1); background-size: 300% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: slideGrad1 8s linear infinite; }
        .heading-line-2 { display: inline-block; background: linear-gradient(90deg, #c084fc, #818cf8, #38bdf8, #a78bfa, #f472b6, #c084fc); background-size: 300% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: slideGrad2 8s linear infinite; animation-delay: -4s; font-weight: 500; }
        @keyframes slideGrad1 { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
        @keyframes slideGrad2 { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
        @keyframes pulse-ping { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes heroFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25px); } }
        @keyframes rotateClockwise { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes rotateCounterClockwise { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(-360deg); } }
        @keyframes shimmerSwipe { 0% { left: -100%; } 100% { left: 150%; } }
        .shine-btn::after {
          content: '';
          position: absolute;
          top: -100%;
          left: -100%;
          width: 50%;
          height: 300%;
          background: rgba(255, 255, 255, 0.25);
          transform: rotate(35deg);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .shine-btn:hover::after {
          left: 150%;
        }
      `}</style>
    </div>
  );
}