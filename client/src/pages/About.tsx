import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Lightbulb, Target, Shield, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
      for (let i = 0; i < 50; i++) {
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

        if (dist < 150) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.12 * (1 - dist / 150) + p.energy * 0.3})`;
          ctx.lineWidth = 0.7 + p.energy * 1;
          ctx.stroke();
        }
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

function HorizonGlow() {
  return (
    <div style={{ position: 'absolute', top: '0', left: '-10%', right: '-10%', height: '40%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '160%', height: '100%', background: 'radial-gradient(ellipse at top, rgba(99, 103, 255, 0.15) 0%, rgba(132, 148, 255, 0.05) 40%, transparent 75%)', filter: 'blur(100px)' }} />
    </div>
  );
}

function PulsingBadge({ text }: { text: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', borderRadius: '100px', background: 'rgba(99, 103, 255, 0.06)', border: '1px solid rgba(99, 103, 255, 0.15)', marginBottom: '24px', backdropFilter: 'blur(8px)' }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6367FF', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: '#6367FF', opacity: 0.4, animation: 'pulse-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
      </div>
      <span style={{ fontSize: '12px', fontWeight: 600, color: '#6367FF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

function BackgroundGlow({ color = 'rgba(99, 103, 255, 0.1)', size = '400px', top, left, right, bottom }: any) {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        top, left, right, bottom,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}

const BRAND_GRADIENTS = {
  primary: 'linear-gradient(90deg, #6367FF, #8494FF)',
  premium: 'linear-gradient(90deg, #ffffff, #6367FF, #8494FF, #6367FF, #ffffff)',
  cta: 'linear-gradient(90deg, #6367FF 0%, #8494FF 100%)'
};

function MagneticButton({ href, label }: { href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={href}>
      <a onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 32px', background: 'transparent', borderRadius: '100px', position: 'relative', zIndex: 10, cursor: 'pointer', textDecoration: 'none', fontWeight: 600, fontSize: '16px', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)', transform: isHovered ? 'translateY(-2px)' : 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '100px', border: '1.5px solid rgba(255,255,255,0.8)', opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '100px', padding: '1.5px', background: 'linear-gradient(90deg, #6367FF, #8494FF)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', inset: -2, borderRadius: '100px', background: 'linear-gradient(90deg, #6367FF, #8494FF)', opacity: isHovered ? 0.25 : 0, filter: 'blur(10px)', transition: 'opacity 0.3s ease', zIndex: -1 }} />
        <span style={{ position: 'relative' }}>
          <span style={{ color: '#ffffff', opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }}>{label}</span>
          <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', background: 'linear-gradient(90deg, #6367FF, #8494FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>{label}</span>
        </span>
      </a>
    </Link>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};

export default function About() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We push boundaries and embrace emerging technologies to solve tomorrow\'s challenges today.',
      color: '#6367FF',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We deliver premium solutions that exceed expectations and drive measurable impact.',
      color: '#a855f7',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We build trust through transparency, ethical practices, and accountability.',
      color: '#ef4444',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with clients to understand and solve their unique challenges.',
      color: '#22c55e',
    },
  ];

  return (
    <div className="min-h-screen bg-background" style={{ background: '#0a0e27' }}>
      <style>{`
        @keyframes animatedTextGradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes pulse-ping { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.5); opacity: 0; } }
        .premium-gradient-text { background: linear-gradient(90deg, #ffffff, #6367FF, #8494FF, #6367FF, #ffffff); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; animation: animatedTextGradient 8s linear infinite; display: block; width: fit-content; }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '160px', paddingBottom: '100px', display: 'flex', alignItems: 'center' }}>
        <StarField />
        <HorizonGlow />
        <ParticleCanvas />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
          >
            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}><PulsingBadge text="Our Legacy" /></motion.div>
            <motion.h1 variants={itemVariants} className="premium-gradient-text" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em', margin: '0 auto 24px' }}>
              About HodorInfo
            </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
              Transforming industries through next-level technology and digital innovation. We engineer solutions that redefine the global industrial landscape.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section style={{ position: 'relative', zIndex: 1, padding: '100px 0' }}>
        <BackgroundGlow color="rgba(0,212,255,0.05)" top="20%" left="-10%" size="600px" />
        <div className="container">
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '140px' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ flex: '1 1 500px' }}
            >
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 40%, rgba(0,212,255,0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: -1 }} />
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }}>Our Mission</h2>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '24px' }}>
                To empower industries globally by delivering transformative digital solutions that leverage advanced technologies, enabling businesses to operate smarter, faster, and more securely in an increasingly digital world.
              </p>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '40px' }}>
                We don't just build software—we fundamentally reimagine how industries operate by integrating cutting-edge technologies including AI, drones, cybersecurity, data science, and specialized enterprise solutions.
              </p>
              <MagneticButton label="Explore Our Services" href="/services" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{ flex: '1 1 400px', position: 'relative' }}
            >
                <motion.div
                  style={{ borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', transformStyle: 'preserve-3d', background: 'rgba(255,255,255,0.02)' }}
                  whileHover={{ rotateY: -15, rotateX: 10, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <DotLottieReact
                    src="https://lottie.host/146b25fc-403b-4799-8fc1-50d18f7be59c/hbQqfh2JNb.lottie"
                    loop
                    autoplay
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,14,39,0.3), transparent)', pointerEvents: 'none' }}></div>
                </motion.div>
            </motion.div>
          </div>

          {/* Core Competencies */}
          <div style={{
            padding: '100px 60px',
            borderRadius: '60px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 100px rgba(0,212,255,0.03)'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)' }} />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#ffffff', marginBottom: '80px', textAlign: 'center', letterSpacing: '-0.02em' }}>Our Core Competencies</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              justifyContent: 'center',
              alignItems: 'stretch',
              position: 'relative',
              zIndex: 1,
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {[
                { title: 'Enterprise Software', description: 'Next-generation platforms that automate and optimize complex business processes.' },
                { title: 'AI & Machine Learning', description: 'Intelligent agents and ML models for automated decision-making and analytics.' },
                { title: 'Drone Technology', description: 'Design, deploy, and manage drone systems for industrial applications.' },
                { title: 'Cybersecurity', description: 'Specialized protection for drones, satellites, and aerospace systems.' },
                { title: 'Data Science', description: 'Advanced analytics and data engineering for actionable insights.' },
                { title: 'Digital Transformation', description: 'Comprehensive modernization and technology integration consulting.' },
              ].map((competency, idx) => (
                <div key={idx} style={{ perspective: '2000px', display: 'flex', justifyContent: 'center' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 80, rotateY: 25, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    animate={{ y: [0, -10, 0] }}
                    // @ts-ignore
                    transition={{
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 },
                      default: { delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }
                    }}
                    whileHover={{ rotateX: 35, y: -25, scale: 1.05 }}
                    className="glass-card"
                    style={{
                      padding: '56px 40px',
                      borderRadius: '35px',
                      transformStyle: 'preserve-3d',
                      cursor: 'pointer',
                      textAlign: 'center',
                      width: '100%',
                      maxWidth: '380px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    <motion.div style={{ transformStyle: 'preserve-3d' }} whileHover={{ translateZ: 100, rotateX: -35 }}>
                      <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%) translateZ(-1px)', width: '60px', height: '60px', background: 'rgba(0,212,255,0.2)', filter: 'blur(30px)', opacity: 0, transition: 'opacity 0.4s' }} className="node-glow" />
                      <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginBottom: '20px', letterSpacing: '-0.01em' }}>{competency.title}</h3>
                      <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75 }}>{competency.description}</p>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
            <style>{`
              .glass-card:hover .node-glow { opacity: 1; }
            `}</style>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '120px 0', position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>Our Values</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '640px', margin: '0 auto' }}>
              These principles guide everything we do and how we work with our clients globally.
            </p>
          </div>

          <div style={{
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}>

            <motion.div
              style={{ display: 'flex', gap: '40px', width: 'max-content' }}
              animate={{ x: [0, -1960] }} // Exactly (450px card width + 40px gap) * 4 cards = 1960px 
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...values, ...values].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{
                      padding: '40px',
                      borderRadius: '32px',
                      display: 'flex',
                      gap: '28px',
                      width: '450px',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ flexShrink: 0 }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: `${value.color}15`, border: `1px solid ${value.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={28} color={value.color} />
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>{value.title}</h3>
                      <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section (The 3D Grid from Industries) */}
      <section style={{ padding: '120px 0', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <BackgroundGlow color="rgba(0, 212, 255, 0.15)" top="20%" left="10%" size="400px" />
        <BackgroundGlow color="rgba(176, 38, 255, 0.1)" bottom="10%" right="5%" size="500px" />
        <div className="container">
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#ffffff', marginBottom: '80px', textAlign: 'center' }}>Why Choose HodorInfo?</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            justifyContent: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              {
                title: 'Industry Expertise',
                description: 'Deep understanding of vertical-specific challenges across logistics, agriculture, healthcare, manufacturing, retail, energy, finance, and government sectors.',
              },
              {
                title: 'Technology Integration',
                description: 'Seamless combination of AI, drones, cybersecurity, and data science to create comprehensive, next-level solutions.',
              },
              {
                title: 'Transformative Impact',
                description: 'Not incremental improvements—we fundamentally transform how industries operate, delivering measurable business value.',
              },
              {
                title: 'End-to-End Solutions',
                description: 'From strategy and consulting to implementation, deployment, and ongoing optimization and support.',
              },
              {
                title: 'Security First',
                description: 'Built-in cybersecurity and data protection across all solutions, ensuring compliance and peace of mind.',
              },
              {
                title: 'Scalability',
                description: 'Solutions designed to grow with your business, from startups and SMEs to large enterprises.',
              },
            ].map((item, idx) => (
              <div key={idx} style={{ perspective: '1600px', display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, y: 80, rotateY: 25, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  animate={{ y: [0, -10, 0] }}
                  // @ts-ignore
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 },
                    default: { delay: idx * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileHover={{ rotateX: 35, y: -20, scale: 1.02 }}
                  className="glass-card"
                  style={{ padding: '48px 40px', borderRadius: '32px', transformStyle: 'preserve-3d', cursor: 'pointer', textAlign: 'center', width: '100%', maxWidth: '380px' }}
                >
                  <motion.div style={{ transformStyle: 'preserve-3d' }} whileHover={{ translateZ: 80, rotateX: -35 }}>
                    <div style={{ fontSize: '40px', marginBottom: '24px', opacity: 0.8 }}><Sparkles size={32} color="#6367FF" /></div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>{item.title}</h3>
                    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{item.description}</p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '120px 0 160px', display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ width: '100%', maxWidth: '1000px', borderRadius: '40px', background: 'linear-gradient(90deg, #6367FF 0%, #8494FF 100%)', padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', boxShadow: '0 30px 60px rgba(99, 103, 255, 0.25)' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25, marginBottom: '24px', position: 'relative', zIndex: 1 }}>
              Ready to Partner with HodorInfo?
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.75, position: 'relative', zIndex: 1 }}>
              Let's discuss how we can help transform your industry and drive your business forward.
            </p>
            <Link href="/contact">
              <a style={{ padding: '18px 48px', borderRadius: '99px', background: '#0a0a0a', color: '#ffffff', fontWeight: 600, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                Get in Touch <ArrowRight size={20} style={{ marginLeft: '12px' }} />
              </a>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
