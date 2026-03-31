import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Truck, Leaf, Heart, Factory, ShoppingCart, Zap, CreditCard, Shield, Sparkles } from 'lucide-react';
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

const imageVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as any,
      delay: 0.2
    }
  }
};

export default function Industries() {
  const industries = [
    {
      id: 1,
      icon: Truck,
      title: 'Logistics & Supply Chain',
      description: 'End-to-end automation, real-time tracking, and predictive optimization for global supply chains.',
      solutions: [
        'Transport Management Systems',
        'Real-time Fleet Tracking',
        'Predictive Route Optimization',
        'Inventory Management Automation',
      ],
      color: '#3b82f6',
      lottie: 'https://lottie.host/e918b974-eb1b-40a6-abc6-49edba5c7532/yG6NWR4DHx.lottie'
    },
    {
      id: 2,
      icon: Leaf,
      title: 'Agriculture',
      description: 'AI-driven farming, drone monitoring, yield optimization, and sustainable resource management.',
      solutions: [
        'AI-Powered Crop Optimization',
        'Drone Agricultural Monitoring',
        'Predictive Yield Analysis',
        'Smart Irrigation Systems',
      ],
      color: '#22c55e',
      lottie: 'https://lottie.host/b309f16f-f3c0-4625-86f4-9f17c6807c6f/gW5tAaRQtP.lottie'
    },
    {
      id: 3,
      icon: Heart,
      title: 'Healthcare',
      description: 'Digital health platforms, patient management, diagnostic AI, and workflow automation.',
      solutions: [
        'Patient Management Systems',
        'AI Diagnostic Tools',
        'Healthcare Data Analytics',
        'Telemedicine Platforms',
      ],
      color: '#ef4444',
      lottie: 'https://lottie.host/8cb6068f-946a-45e3-a16b-3d832f81b9b9/MBfQKuoBnT.lottie'
    },
    {
      id: 4,
      icon: Factory,
      title: 'Manufacturing',
      description: 'Quality control automation, predictive maintenance, and production optimization.',
      solutions: [
        'Predictive Maintenance Systems',
        'Quality Control Automation',
        'Production Optimization',
        'IoT Integration',
      ],
      color: '#f97316',
      lottie: 'https://lottie.host/e918b974-eb1b-40a6-abc6-49edba5c7532/yG6NWR4DHx.lottie' // Same as logistics/enterprise
    },
    {
      id: 5,
      icon: ShoppingCart,
      title: 'Retail & E-commerce',
      description: 'Inventory optimization, demand forecasting, and customer analytics.',
      solutions: [
        'Inventory Optimization',
        'Demand Forecasting',
        'Customer Analytics',
        'Personalization Engines',
      ],
      color: '#a855f7',
      lottie: 'https://lottie.host/1d3d7321-d9a1-4282-8d61-8972367aca59/V4flF87TyQ.lottie'
    },
    {
      id: 6,
      icon: Zap,
      title: 'Energy & Utilities',
      description: 'Grid optimization, predictive maintenance, and resource management.',
      solutions: [
        'Smart Grid Optimization',
        'Predictive Maintenance',
        'Energy Consumption Analytics',
        'Renewable Integration',
      ],
      color: '#eab308',
      lottie: 'https://lottie.host/1d3d7321-d9a1-4282-8d61-8972367aca59/V4flF87TyQ.lottie'
    },
    {
      id: 7,
      icon: CreditCard,
      title: 'Finance & Banking',
      description: 'Risk analytics, fraud detection, automated compliance, and data security.',
      solutions: [
        'Risk Analytics Platforms',
        'Fraud Detection Systems',
        'Compliance Automation',
        'Financial Data Security',
      ],
      color: '#6366f1',
      lottie: 'https://lottie.host/4a7a2d4b-726d-473a-8120-4b51b2a50426/bxmopyyWKd.lottie'
    },
    {
      id: 8,
      icon: Shield,
      title: 'Government & Defense',
      description: 'Surveillance systems, data analytics, cybersecurity, and operational efficiency.',
      solutions: [
        'Surveillance Systems',
        'Data Analytics Platforms',
        'Cybersecurity Solutions',
        'Operational Intelligence',
      ],
      color: '#64748b',
      lottie: 'https://lottie.host/3820a739-c242-47ce-bd38-3e1dcd737561/nx5Em0nFc0.lottie'
    },
  ];

  return (
    <div className="min-h-screen bg-background" style={{ background: '#0a0e27' }}>
      <style>{`
        @keyframes animatedTextGradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes pulse-ping { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.5); opacity: 0; } }
        .premium-gradient-text { background: linear-gradient(90deg, #ffffff, #6367FF, #8494FF, #6367FF, #ffffff); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; animation: animatedTextGradient 8s linear infinite; display: block; width: fit-content; }
        .shine-btn::after { content: ''; position: absolute; top: -100%; left: -100%; width: 50%; height: 300%; background: rgba(255, 255, 255, 0.25); transform: rotate(35deg); transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); pointer-events: none; }
        .shine-btn:hover::after { left: 150%; }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .glass-card:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.1); transform: translateY(-5px); }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '160px', paddingBottom: '120px', display: 'flex', alignItems: 'center' }}>
        <StarField />
        <ParticleCanvas />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
          >
            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}><PulsingBadge text="Global Impact" /></motion.div>
            <motion.h1 variants={itemVariants} className="premium-gradient-text" style={{ fontSize: 'clamp(28px, 4.2vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em', margin: '0 auto 24px' }}>
              Industries We Transform
            </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
              From logistics to government, we bring digital innovation and next-level technology to every sector. We don't just build technology—we transform industries.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Industries Alternate Grid */}
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div className="container">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div key={industry.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.25 }}
                variants={containerVariants}
                style={{
                  display: 'flex',
                  flexDirection: index % 2 === 1 ? 'row-reverse' : 'row',
                  gap: '60px',
                  alignItems: 'center',
                  marginBottom: '140px',
                  flexWrap: 'wrap'
                }}>

                {/* Content Side */}
                <motion.div variants={containerVariants} style={{ flex: '1 1 500px' }}>
                  <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${industry.color}15`, border: `1px solid ${industry.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={24} color={industry.color} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: industry.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sector 0{industry.id}</span>
                  </motion.div>

                  <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: '#ffffff', marginBottom: '20px', letterSpacing: '-0.01em' }}>
                    {industry.title}
                  </motion.h2>
                  <motion.p variants={itemVariants} style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '40px' }}>
                    {industry.description}
                  </motion.p>

                  <motion.div variants={itemVariants} style={{ marginBottom: '48px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: industry.color, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tailored Solutions</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                      {industry.solutions.map((solution, idx) => (
                        <motion.div variants={itemVariants} key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: industry.color, flexShrink: 0 }} />
                          <span>{solution}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <MagneticButton label="Explore Solutions" href="/contact" />
                  </motion.div>
                </motion.div>

                {/* Visual Side */}
                <motion.div
                  variants={imageVariants}
                  style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '540px',
                    borderRadius: '35px',
                    padding: '2px',
                    background: `linear-gradient(135deg, ${industry.color}40, transparent 60%, rgba(255,255,255,0.05))`,
                    boxShadow: `0 40px 80px -20px rgba(0,0,0,0.5), 0 0 30px ${industry.color}15`
                  }}>
                    <div style={{
                      position: 'relative',
                      borderRadius: '33px',
                      overflow: 'hidden',
                      aspectRatio: '16/10',
                      background: '#0a0e27',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <DotLottieReact
                        src={industry.lottie}
                        loop
                        autoplay
                        style={{ width: '101%', height: '101%' }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Section (Restyled) */}
      <section style={{ padding: '120px 0', position: 'relative', zIndex: 1, background: 'rgba(0, 0, 0, 0.4)', overflow: 'hidden' }}>
        {/* Animated Background Glows */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99, 103, 255, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: '10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(132, 148, 255, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }}
        />

        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '100px', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#ffffff', marginBottom: '24px', letterSpacing: '-0.02em' }}>Why Choose HodorInfo?</h2>
              <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>Combining deep industry expertise with cutting-edge technology integration to redefine possibilities.</p>
            </motion.div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            justifyContent: 'center',
            alignItems: 'stretch',
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Industry Expertise', description: 'Deep understanding of vertical-specific challenges and opportunities across all sectors.' },
              { title: 'Technology Integration', description: 'Seamless combination of AI, drones, cybersecurity, and data science.' },
              { title: 'Next-Level Innovation', description: 'Not incremental improvements—we fundamentally transform how industries operate.' },
              { title: 'End-to-End Solutions', description: 'From strategy and consulting to implementation, deployment, and optimization.' },
              { title: 'Security First', description: 'Built-in cybersecurity and data protection across all solutions.' },
              { title: 'Scalability', description: 'Solutions designed to grow with your business, from startups to enterprises.' },
            ].map((item, idx) => (
              <div key={idx} style={{ perspective: '1600px', display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, y: 80, rotateY: 25, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -10, 0] }} // Gentle constant floating effect
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 },
                    // We need to keep the initial transition for entrance
                    default: { delay: idx * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileHover={{ rotateX: 35, y: -20, scale: 1.02, transition: { duration: 0.4 } }}
                  className="glass-card"
                  style={{
                    padding: '48px 40px',
                    borderRadius: '32px',
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer',
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    width: '100%',
                    maxWidth: '380px',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center'
                  }}
                >
                  <motion.div
                    style={{ transformStyle: 'preserve-3d' }}
                    whileHover={{ translateZ: 80, rotateX: -35 }}
                  >
                    <div style={{ fontSize: '40px', marginBottom: '24px', opacity: 0.8, filter: 'drop-shadow(0 0 10px rgba(99, 103, 255, 0.4))' }}>
                      <Sparkles size={32} color="#6367FF" />
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginBottom: '18px', letterSpacing: '-0.01em' }}>{item.title}</h3>
                    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{item.description}</p>
                  </motion.div>

                  {/* Surface Glow/Shadow for 3D effect */}
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '32px', background: 'radial-gradient(circle at 50% 50%, rgba(99, 103, 255, 0.1), transparent 80%)', pointerEvents: 'none', opacity: 0, transition: 'opacity 0.4s' }} className="hover-glow" />
                </motion.div>
                <style>{`
                  .glass-card:hover .hover-glow { opacity: 1; }
                  .glass-card:hover { border-color: rgba(99, 103, 255, 0.3); background: rgba(255, 255, 255, 0.05); }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0 160px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="container mx-auto px-6" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
              Ready to Transform<br />Your Strategy?
            </motion.h2>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.95)', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.75, position: 'relative', zIndex: 1 }}>
              Let's discuss how HodorInfo can revolutionize your industry with bespoke technology solutions.
            </p>
            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <Link href="/contact">
                <a className="shine-btn"
                  style={{ padding: '18px 48px', borderRadius: '99px', background: '#0a0a0a', color: '#ffffff', fontWeight: 700, fontSize: '16px', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '180px', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  Get Started Today <ArrowRight size={20} style={{ marginLeft: '12px' }} />
                </a>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
