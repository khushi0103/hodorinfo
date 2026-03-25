import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Sparkles, Zap, Brain, Plane, Shield, BarChart3, Cog, ChevronRight } from 'lucide-react';
import { motion, useInView, Variants } from 'framer-motion';
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
      <span style={{ fontSize: '12px', fontWeight: 600, color: '#00d4ff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

function MagneticButton({ href, label }: { href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={href}>
      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 32px', background: 'transparent', borderRadius: '100px', position: 'relative', zIndex: 10, cursor: 'pointer', textDecoration: 'none', fontWeight: 600, fontSize: '16px', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)', transform: isHovered ? 'translateY(-2px)' : 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '100px', border: '1.5px solid rgba(255,255,255,0.8)', opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '100px', padding: '1.5px', background: 'linear-gradient(90deg, #6367FF, #8494FF)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', inset: -2, borderRadius: '100px', background: 'linear-gradient(90deg, #6367FF, #8494FF)', opacity: isHovered ? 0.25 : 0, filter: 'blur(10px)', transition: 'opacity 0.3s ease', zIndex: -1 }} />
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
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2
    }
  }
};

export default function Services() {
  // Handle smooth scroll to hash on mount or hash change
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Reduced timeout to almost nothing for "instant" feel
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            // Using auto instead of smooth for "turant" navigation as requested
            element.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }, 0);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    scrollToHash();
    window.addEventListener('popstate', scrollToHash);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.removeEventListener('popstate', scrollToHash);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);
  const services = [
    {
      id: 1,
      title: 'Specialized Enterprise Software',
      description: 'Next-generation platforms designed to automate and optimize complex business processes.',
      image: 'https://lottie.host/e918b974-eb1b-40a6-abc6-49edba5c7532/yG6NWR4DHx.lottie',
      icon: Cog,
      color: '#00d4ff',
      features: [
        'Transport Management Systems (TMS)',
        'AgriTech Platforms',
        'Healthcare Technology Solutions',
        'Industry-Specific Custom Solutions',
      ],
      benefits: [
        'Complete supply chain automation',
        'Real-time tracking and optimization',
        'Seamless integration with existing systems',
        'Scalable architecture for enterprise growth',
      ],
    },
    {
      id: 2,
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Deploy intelligent agents and ML models to automate decision-making and predictive analytics.',
      image: "https://lottie.host/8cb6068f-946a-45e3-a16b-3d832f81b9b9/MBfQKuoBnT.lottie",
      icon: Brain,
      color: '#a78bfa',
      features: [
        'Predictive Analytics',
        'AI Agents & Automation',
        'Natural Language Processing',
        'Computer Vision Solutions',
      ],
      benefits: [
        'Automated decision-making',
        'Accurate forecasting',
        'Reduced operational costs',
        'Intelligent process optimization',
      ],
    },
    {
      id: 3,
      title: 'Drone Technology & Aerial Solutions',
      description: 'Design, deploy, and manage drone systems for industrial applications and data collection.',
      image: 'https://lottie.host/b309f16f-f3c0-4625-86f4-9f17c6807c6f/gW5tAaRQtP.lottie',
      icon: Plane,
      color: '#34d399',
      features: [
        'Agricultural Monitoring',
        'Infrastructure Inspection',
        'Delivery & Logistics Drones',
        'Environmental Monitoring',
      ],
      benefits: [
        'Real-time aerial data collection',
        'Reduced inspection costs',
        'Improved safety and efficiency',
        'Advanced mapping and surveying',
      ],
    },
    {
      id: 4,
      title: 'Cybersecurity & Aerospace Protection',
      description: 'Specialized security solutions for drones, satellites, and critical aerospace systems.',
      image: 'https://lottie.host/3820a739-c242-47ce-bd38-3e1dcd737561/nx5Em0nFc0.lottie',
      icon: Shield,
      color: '#fb923c',
      features: [
        'Drone Communication Security',
        'Anti-Drone Systems',
        'Satellite Network Protection',
        'Threat Detection & Response',
      ],
      benefits: [
        'Advanced threat protection',
        'Encrypted communications',
        'Real-time threat monitoring',
        'Compliance with aerospace standards',
      ],
    },
    {
      id: 5,
      title: 'Data Science & Advanced Analytics',
      description: 'Extract insights and drive decisions with advanced analytics and data engineering.',
      image: 'https://lottie.host/4a7a2d4b-726d-473a-8120-4b51b2a50426/bxmopyyWKd.lottie',
      icon: BarChart3,
      color: '#f472b6',
      features: [
        'Predictive Modeling',
        'Data Pipeline Engineering',
        'Business Intelligence',
        'Real-Time Analytics',
      ],
      benefits: [
        'Data-driven decision making',
        'Actionable insights',
        'Improved business intelligence',
        'Scalable data infrastructure',
      ],
    },
    {
      id: 6,
      title: 'Digital Transformation Consulting',
      description: 'Guide organizations through comprehensive modernization and technology integration.',
      image: 'https://lottie.host/1d3d7321-d9a1-4282-8d61-8972367aca59/V4flF87TyQ.lottie',
      icon: Zap,
      color: '#facc15',
      features: [
        'Digital Strategy Development',
        'Legacy System Modernization',
        'Cloud Migration',
        'Change Management',
      ],
      benefits: [
        'Clear transformation roadmap',
        'Reduced technical debt',
        'Improved operational efficiency',
        'Future-proof infrastructure',
      ],
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
            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}><PulsingBadge text="Enterprise Solutions" /></motion.div>
            <motion.h1 variants={itemVariants} className="premium-gradient-text" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em', margin: '0 auto 24px' }}>
              Our Services
            </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
              Six interconnected technology pillars enabling industry transformation across all sectors. We engineer the future with precision and innovation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div className="container">
          {services.map((service, index) => {
            const Icon = service.icon;
            // Define a customized ref for scroll tracing
            return (
              <motion.div
                key={service.id}
                id={`service-${service.id}`}
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
                }}
              >

                {/* Content Side */}
                <motion.div variants={containerVariants} style={{ flex: '1 1 500px' }}>
                  <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${service.color}15`, border: `1px solid ${service.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={24} color={service.color} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: service.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Service 0{service.id}</span>
                  </motion.div>

                  <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: '#ffffff', marginBottom: '20px', letterSpacing: '-0.01em' }}>
                    {service.title}
                  </motion.h2>
                  <motion.p variants={itemVariants} style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '40px' }}>
                    {service.description}
                  </motion.p>

                  <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
                    <motion.div variants={itemVariants}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: service.color, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Features</h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {service.features.map((feature, idx) => (
                          <motion.li variants={itemVariants} key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px', color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: service.color, marginTop: '8px', flexShrink: 0 }} />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strategic Benefits</h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {service.benefits.map((benefit, idx) => (
                          <motion.li variants={itemVariants} key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px', color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', marginTop: '8px', flexShrink: 0 }} />
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <MagneticButton label="Consult Experts" href="/contact" />
                  </motion.div>
                </motion.div>

                {/* Image Side - Premium Glassmorphism Frame with Slide-in animation */}
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
                    background: `linear-gradient(135deg, ${service.color}40, transparent 60%, rgba(255,255,255,0.05))`,
                    boxShadow: `0 40px 80px -20px rgba(0,0,0,0.5), 0 0 30px ${service.color}15`
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
                      {service.image.endsWith('.lottie') ? (
                        <DotLottieReact
                          src={service.image}
                          loop
                          autoplay
                          style={{ width: '101%', height: '101%' }} // Slight overshoot to prevent thin gaps
                        />
                      ) : (
                        <>
                          <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'lighten' }} />
                          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(10,14,39,0.4), transparent)` }} />
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 0 160px', display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ width: '100%', maxWidth: '1000px', borderRadius: '40px', background: 'linear-gradient(90deg, #6367FF 0%, #8494FF 100%)', padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(99, 103, 255, 0.25)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
              <Sparkles size={14} color="rgba(255,255,255,0.5)" fill="currentColor" />
              <Sparkles size={20} color="#ffffff" fill="currentColor" style={{ transform: 'translateY(-6px)' }} />
              <Sparkles size={14} color="rgba(255,255,255,0.5)" fill="currentColor" />
            </motion.div>

            <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>
              Ready to Transform<br />Your Industry?
            </motion.h2>
            <motion.p variants={itemVariants} style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.75, position: 'relative', zIndex: 1 }}>
              Let's discuss how HodorInfo can revolutionize your business with next-level technology solutions.
            </motion.p>
            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <Link href="/contact" className="shine-btn"
                style={{ padding: '18px 48px', borderRadius: '99px', background: '#0a0a0a', color: '#ffffff', fontWeight: 600, fontSize: '16px', textDecoration: 'none', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '180px', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={(e: any) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)'; }}
                onMouseLeave={(e: any) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                Schedule a Consultation <ArrowRight size={20} style={{ marginLeft: '12px' }} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
