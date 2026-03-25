import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

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
      {[...Array(30)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`, background: '#ffffff', borderRadius: '50%', opacity: Math.random() * 1.2 + 0.1, boxShadow: '0 0 10px #ffffff' }} className="animate-pulse" />
      ))}
    </div>
  );
}

function HorizonGlow() {
  return (
    <div style={{ position: 'absolute', top: '0', left: '-10%', right: '-10%', height: '40%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '160%', height: '100%', background: 'radial-gradient(ellipse at top, rgba(0, 212, 255, 0.15) 0%, rgba(0, 168, 204, 0.05) 40%, transparent 75%)', filter: 'blur(100px)' }} />
    </div>
  );
}

function BackgroundGlow({ color = 'rgba(0, 212, 255, 0.1)', size = '400px', top, left, right, bottom }: any) {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: 'absolute', top, left, right, bottom, width: size, height: size, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

function PulsingBadge({ text }: { text: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', borderRadius: '100px', background: 'rgba(0, 212, 255, 0.06)', border: '1px solid rgba(0, 212, 255, 0.15)', marginBottom: '24px', backdropFilter: 'blur(8px)' }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00d4ff', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: '#00d4ff', opacity: 0.4, animation: 'pulse-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
      </div>
      <span style={{ fontSize: '12px', fontWeight: 600, color: '#00d4ff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background" style={{ background: '#0a0e27' }}>
      <style>{`
        @keyframes animatedTextGradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes pulse-ping { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.5); opacity: 0; } }
        .premium-gradient-text { background: linear-gradient(90deg, #ffffff, #00d4ff, #00df9a, #00d4ff, #ffffff); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; animation: animatedTextGradient 8s linear infinite; display: block; width: fit-content; }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .input-premium { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; color: #ffffff; padding: 14px 18px; transition: all 0.3s ease; }
        .input-premium:focus { border-color: #00d4ff; background: rgba(0, 212, 255, 0.05); outline: none; box-shadow: 0 0 20px rgba(0, 212, 255, 0.1); }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '160px', paddingBottom: '80px', display: 'flex', alignItems: 'center' }}>
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
            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}><PulsingBadge text="Let's Connect" /></motion.div>
            <motion.h1 variants={itemVariants} className="premium-gradient-text" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em', margin: '0 auto 24px' }}>
              Get in Touch
            </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
              Have questions about our services? Let's start a conversation about transforming your industry with next-level innovation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: '80px 0 140px', position: 'relative', zIndex: 1 }}>
        <BackgroundGlow color="rgba(0, 212, 255, 0.1)" top="10%" left="-5%" size="600px" />
        <BackgroundGlow color="rgba(176, 38, 255, 0.08)" bottom="10%" right="-5%" size="600px" />

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="lg:col-span-4 space-y-8"
            >
              <motion.h2 variants={itemVariants} style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '40px' }}>Contact Information</motion.h2>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: 'Email', value: 'info@hodorinfo.com', link: 'mailto:info@hodorinfo.com', color: '#00d4ff' },
                  { icon: Phone, title: 'Phone', value: '+1 (234) 567-890', link: 'tel:+1234567890', color: '#a855f7' },
                  { icon: MapPin, title: 'Address', value: 'Global Headquarters, Tech City, Digital District', color: '#ef4444' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="glass-card"
                      style={{ padding: '24px', borderRadius: '24px', display: 'flex', gap: '20px', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div style={{ flexShrink: 0 }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${item.color}15`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={22} color={item.color} />
                        </div>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{item.title}</h3>
                        {item.link ? (
                          <a href={item.link} className="text-[#ffffff] hover:text-[#00d4ff] transition-colors font-semibold">{item.value}</a>
                        ) : (
                          <p className="text-[#ffffff] font-semibold">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Links */}
              <motion.div variants={itemVariants} style={{ marginTop: '60px', padding: '40px', borderRadius: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }}>Quick Links</h3>
                <ul className="space-y-4">
                  {['Services', 'Industries', 'About', 'Blog'].map((link) => (
                    <li key={link}>
                      <a href={`/${link.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '10px' }} className="hover:text-cyan-accent group">
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00d4ff', opacity: 0.5 }} />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="lg:col-span-8"
            >
              <motion.div
                variants={itemVariants}
                className="glass-card"
                style={{ padding: '60px', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)' }} />
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', marginBottom: '40px' }}>Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="name" className="block text-sm font-semibold mb-3 text-white/70">Full Name *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full input-premium" placeholder="John Doe" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="block text-sm font-semibold mb-3 text-white/70">Email Address *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full input-premium" placeholder="john@example.com" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="company" className="block text-sm font-semibold mb-3 text-white/70">Company Name</label>
                      <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full input-premium" placeholder="Your Company" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="service" className="block text-sm font-semibold mb-3 text-white/70">Service of Interest *</label>
                      <select id="service" name="service" value={formData.service} onChange={handleChange} required className="w-full input-premium" style={{ appearance: 'none' }}>
                        <option value="">Select a service</option>
                        <option value="enterprise-software">Enterprise Software</option>
                        <option value="ai-ml">AI & Machine Learning</option>
                        <option value="drone-tech">Drone Technology</option>
                        <option value="cybersecurity">Cybersecurity</option>
                        <option value="data-science">Data Science</option>
                        <option value="digital-transformation">Digital Transformation</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-semibold mb-3 text-white/70">Message *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full input-premium resize-none" placeholder="Tell us about your project..."></textarea>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '18px',
                        borderRadius: '16px',
                        background: 'linear-gradient(90deg, #0088aa, #00b894)',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '16px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 30px rgba(0, 212, 255, 0.2)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 212, 255, 0.4)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)'; }}
                    >
                      {isSubmitting ? (
                        <>
                          <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                          Sending...
                        </>
                      ) : (
                        <>Send Message <Send size={20} /></>
                      )}
                    </button>
                  </motion.div>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </form>

                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '32px', textAlign: 'center' }}>
                  * Required fields. We usually respond within 24 hours.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section style={{ padding: '100px 0 160px', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ padding: '80px 40px', borderRadius: '60px', background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(176, 38, 255, 0.05))', border: '1px solid rgba(255,255,255,0.03)' }}
          >
            <Sparkles size={48} color="#00d4ff" style={{ margin: '0 auto 32px', opacity: 0.6 }} />
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }}>Let's Start Your Transformation</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '640px', margin: '0 auto' }}>Whether you have questions or are ready to begin, our team is here to help you succeed in the digital age.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
