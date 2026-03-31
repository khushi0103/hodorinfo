import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import StaticFrameContentLoop from '@/components/ui/StaticFrameContentLoop'; // Main Maydiv Component
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Zap, Brain, Plane, Shield, BarChart3, Cog, ChevronRight, Sparkles } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
        const r = Math.floor(99 + 33 * p.energy);
        const g = Math.floor(103 + 45 * p.energy);
        const b = 255;

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.25 + p.energy * 0.4})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 130) {
            const avgEnergy = (pts[i].energy + pts[j].energy) / 2;
            const r = Math.floor(99 + 33 * avgEnergy);
            const g = Math.floor(103 + 45 * avgEnergy);
            const b = 255;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.08 * (1 - d / 130) + avgEnergy * 0.2})`;
            ctx.lineWidth = 0.5 + avgEnergy * 1;
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
      {[...Array(30)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`, background: '#ffffff', borderRadius: '50%', opacity: Math.random() * 1.2 + 0.1, boxShadow: '0 0 10px #ffffff' }} className="animate-pulse" />
      ))}
    </div>
  );
}


function PulsingBadge() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '8px 18px', borderRadius: '100px', background: 'rgba(99, 103, 255, 0.08)', border: '1px solid rgba(99, 103, 255, 0.2)', marginBottom: '32px', backdropFilter: 'blur(8px)' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6367FF', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: '#6367FF', opacity: 0.4, animation: 'pulse-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
      </div>
      <span style={{ fontSize: '14px', fontWeight: 600, color: '#6367FF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Next-Level Enterprise Technology</span>
    </div>
  );
}

function HeroImage() {
  return (
    <div style={{ transition: 'transform 0.1s ease-out', width: '100%', maxWidth: '1300px', margin: '0 auto' }}>
      <div style={{ position: 'relative', width: '100%', animation: 'heroFloat 6s ease-in-out infinite' }}>
        {/* Orbital Rings - 3D Perspective */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotateX(65deg) rotateY(15deg)', width: '140%', height: '140%', zIndex: 1, pointerEvents: 'none' }}>

          <div style={{ width: '100%', height: '100%', border: '1px solid rgba(99, 103, 255, 0.2)', borderRadius: '50%', animation: 'rotateFull 25s linear infinite' }} />

          <div style={{ width: '100%', height: '100%', border: '1px solid rgba(99, 103, 255, 0.2)', borderRadius: '50%', animation: 'rotateFull 25s linear infinite' }}>
            <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)', width: '10px', height: '100%', pointerEvents: 'none' }}>
              <div style={{ width: '12px', height: '12px', background: '#6367FF', borderRadius: '50%', boxShadow: '0 0 20px #6367FF', animation: 'heroFloat 3s ease-in-out infinite' }} />
            </div>
          </div>

        </div>

        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotateX(-45deg) rotateY(-25deg)', width: '120%', height: '120%', zIndex: 1, pointerEvents: 'none' }}>
          <div style={{ width: '100%', height: '100%', border: '1px dashed rgba(132, 148, 255, 0.15)', borderRadius: '50%', animation: 'rotateFull 35s linear infinite reverse' }} />
        </div>

        {/* Shadow Glow */}
        <div style={{ position: 'absolute', bottom: '-15%', left: '10%', right: '10%', height: '80%', background: 'radial-gradient(ellipse, rgba(99, 103, 255, 0.2) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
          <div style={{ position: 'relative', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
            <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 90%)', maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 90%)' }}>
              <DotLottieReact
                src="https://lottie.host/28c689f9-8afe-4755-a364-887ae7803770/OGuhiwysGC.lottie"
                loop
                autoplay
                style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.95, mixBlendMode: 'lighten', filter: 'blur(0.5px)' }}
              />
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
      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px 36px', background: 'transparent', borderRadius: '100px', position: 'relative', zIndex: 10, cursor: 'pointer', textDecoration: 'none', fontWeight: 600, fontSize: '18px', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)', transform: isHovered ? 'translateY(-2px)' : 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '100px', border: '2px solid rgba(255,255,255,0.9)', opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '100px', padding: '2px', background: 'linear-gradient(90deg, #6367FF, #8494FF)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', inset: -2, borderRadius: '100px', background: 'linear-gradient(90deg, #6367FF, #8494FF)', opacity: isHovered ? 0.3 : 0, filter: 'blur(12px)', transition: 'opacity 0.3s ease', zIndex: -1 }} />
        <span style={{ position: 'relative' }}>
          <span style={{ color: '#ffffff', opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }}>{label}</span>
          <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', background: 'linear-gradient(90deg, #6367FF, #8494FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>{label}</span>
        </span>
      </div>
    </Link>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1.15,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2
    }
  }
};

const services = [
  { icon: Cog, title: 'Enterprise Software', desc: 'Next-generation platforms that automate and optimize complex business processes across any industry.', color: '#00d4ff', href: '/services#service-1' },
  { icon: Brain, title: 'AI & Machine Learning', desc: 'Deploy intelligent agents and ML models to automate decision-making and predictive analytics.', color: '#a78bfa', href: '/services#service-2' },
  { icon: Plane, title: 'Drone Technology', desc: 'Design, deploy, and manage drone systems for industrial applications and aerial solutions.', color: '#34d399', href: '/services#service-3' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Specialized protection for drones, satellites, and critical aerospace systems.', color: '#fb923c', href: '/services#service-4' },
  { icon: BarChart3, title: 'Data Science', desc: 'Extract insights and drive decisions with advanced analytics and data engineering.', color: '#f472b6', href: '/services#service-5' },
  { icon: Zap, title: 'Digital Transformation', desc: 'Guide organizations through comprehensive modernization and technology integration.', color: '#facc15', href: '/services#service-6' },
];

function IndustryCard({ name, icon, index }: { name: string; icon: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        padding: '36px 32px',
        borderRadius: '28px',
        background: isHovered ? 'rgba(99, 103, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
        border: '1px solid',
        borderColor: isHovered ? 'rgba(99, 103, 255, 0.45)' : 'rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered ? '0 20px 40px rgba(99, 103, 255, 0.2), inset 0 0 25px rgba(99, 103, 255, 0.25)' : 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      } as any}
      whileHover={{ y: -10 }}
    >
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
        <motion.div
          style={{
            fontSize: '32px',
            background: 'rgba(99, 103, 255, 0.05)',
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(99, 103, 255, 0.1)',
            flexShrink: 0
          }}
        >
          {icon}
        </motion.div>

        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{name}</h3>
          <ChevronRight size={14} style={{ marginLeft: 'auto', color: 'rgba(99, 103, 255, 0.5)', transition: 'transform 0.3s ease', transform: isHovered ? 'translateX(5px)' : 'none' }} />
        </div>
      </div>
    </motion.div>
  );
}

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


function FloatingAccents() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="absolute animate-pulse" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)', filter: 'blur(40px)', animationDuration: `${3 + Math.random() * 5}s`, animationDelay: `${Math.random() * 2}s` }} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e27] relative overflow-x-hidden">
      <style>{`
        @keyframes animatedTextGradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes fadeUpReveal { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .premium-gradient-text { background: linear-gradient(90deg, #ffffff, #6367FF, #8494FF, #6367FF, #ffffff); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; animation: animatedTextGradient 8s linear infinite; display: block; width: fit-content; }
      `}</style>

      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <StarField />
        <FloatingAccents />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e27]/40 to-[#0a0e27]" />
      </div>

      <div className="relative z-10">
        <Navigation />

        {/* HERO SECTION - Now Transparent with local effects */}
        <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '80px', paddingBottom: '80px', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663026809090/hnrrSqkFZFAiwHyMRLF6Qv/hodor-hero-tech-background-LdQqcCh7PBcqhdmaDGgBHk.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.04 }} />
          </div>
          <ParticleCanvas />
          <div className="container mx-auto px-6 relative z-10">
            <div style={{ padding: '40px 0', position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={containerVariants}
                style={{ flex: '1 1 600px', maxWidth: '1050px' }}
              >
                <motion.div variants={itemVariants}><PulsingBadge /></motion.div>
                <motion.h1
                  style={{ fontSize: 'clamp(28px, 4.2vw, 64px)', fontWeight: 500, lineHeight: 1.1, marginBottom: '28px', fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em', overflow: 'hidden' }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="premium-gradient-text"
                    style={{ paddingRight: '20px' }}
                  >
                    Transform Any Industry
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="premium-gradient-text"
                    style={{ paddingRight: '20px' }}
                  >
                    with Next-Level
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="premium-gradient-text"
                    style={{ paddingRight: '20px', paddingBottom: '12px' }}
                  >
                    Technology
                  </motion.span>
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  style={{ fontSize: 'clamp(16px, 1.1vw, 18px)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '640px', marginBottom: '48px', fontWeight: 400 }}
                >
                  HodorInfo specializes in digital transformation across all industries. We combine enterprise software, AI, drones, cybersecurity, and data science to revolutionize how businesses operate.
                </motion.p>
                <motion.div
                  variants={itemVariants}
                  style={{ display: 'flex', gap: '32px', justifyContent: 'flex-start', flexWrap: 'wrap' }}
                >
                  <MagneticButton label="Get started" href="/contact" primary={true} />
                  <MagneticButton label="Our Services" href="/services" primary={false} />
                </motion.div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={imageVariants}
                style={{ flex: '1 1 500px', maxWidth: '1200px', position: 'relative', width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '0 auto', transform: 'translate(-40px, 40px)' }}
              >
                <HeroImage />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CORE COMPETENCIES SECTION - MAYDIV STYLE (Static Frames + Moving Content) */}
        <section style={{ padding: '100px 0 0', background: 'transparent', position: 'relative', zIndex: 1 }}>
          <div className="container mx-auto px-6">
            <div style={{ textAlign: 'center', marginBottom: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="premium-gradient-text" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, fontFamily: "'Poppins', sans-serif", marginBottom: '16px', letterSpacing: '-0.02em' }}>Our Core Competencies</h2>
              <p style={{ fontSize: '18px', color: 'rgba(224,224,224,0.7)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>Six interconnected technology pillars enabling industry transformation</p>
            </div>

            {/* This is where the fixed frames with looping content live */}
            <StaticFrameContentLoop data={services} />

          </div>
        </section>

        {/* INDUSTRIES SECTION */}
        <section style={{ padding: '100px 0' }}>
          <div className="container mx-auto px-6">
            <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: '16px' }}>Industries</div>
              <h2 className="premium-gradient-text" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, fontFamily: "'Poppins', sans-serif", marginBottom: '14px' }}>Industries We Transform</h2>
              <p style={{ fontSize: '16px', color: 'rgba(224,224,224,0.6)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>From logistics to healthcare, we bring digital innovation to every sector</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', perspective: '1500px' }}>
              {industries.map((ind, i) => (
                <IndustryCard key={i} name={ind.name} icon={ind.icon} index={i} />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <Link
                href="/industries"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 600, color: '#6367FF', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                onMouseEnter={(e: any) => { (e.currentTarget as HTMLElement).style.gap = '15px'; (e.currentTarget as HTMLElement).style.textShadow = '0 0 15px rgba(99, 103, 255, 0.4)'; }}
                onMouseLeave={(e: any) => { (e.currentTarget as HTMLElement).style.gap = '10px'; (e.currentTarget as HTMLElement).style.textShadow = 'none'; }}
              >
                View All Industries <ArrowRight size={22} style={{ transition: 'transform 0.3s ease' }} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section style={{ padding: '80px 0 140px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          <div className="container mx-auto px-6" style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              style={{ 
                width: '100%', 
                maxWidth: '1400px', 
                borderRadius: '60px', 
                background: 'linear-gradient(145deg, rgba(99, 103, 255, 0.95) 0%, rgba(132, 148, 255, 0.85) 100%)', 
                padding: '64px 40px', 
                textAlign: 'center', 
                position: 'relative', 
                overflow: 'hidden', 
                border: '1px solid rgba(255, 255, 255, 0.2)', 
                backdropFilter: 'blur(12px)', 
                boxShadow: '0 40px 80px rgba(99, 103, 255, 0.3)' 
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
                <Sparkles size={14} color="rgba(255,255,255,0.5)" fill="currentColor" />
                <Sparkles size={20} color="#ffffff" fill="currentColor" style={{ transform: 'translateY(-6px)' }} />
                <Sparkles size={14} color="rgba(255,255,255,0.5)" fill="currentColor" />
              </motion.div>

              <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>
                Ready to Transform<br />Your Industry?
              </motion.h2>
              <motion.p variants={itemVariants} style={{ fontSize: '20px', color: 'rgba(255,255,255,0.95)', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.75, position: 'relative', zIndex: 1 }}>
                Let's discuss how HodorInfo can revolutionize your business with next-level technology solutions.
              </motion.p>
              <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                <Link
                  href="/contact"
                  className="shine-btn"
                  style={{ padding: '18px 48px', borderRadius: '99px', background: '#0a0a0a', color: '#ffffff', fontWeight: 700, fontSize: '16px', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '180px', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={(e: any) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)'; }}
                  onMouseLeave={(e: any) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  Schedule a Consultation <ArrowRight size={20} style={{ marginLeft: '12px' }} />
                </Link>
              </motion.div>
            </motion.div>
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
          @keyframes blink { from, to { opacity: 0; } 50% { opacity: 1; } }
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
    </div>
  );
}
