import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceData {
    title: string;
    desc: string;
    color: string;
    icon: any;
}

const StaticFrameContentLoop = ({ data }: { data: ServiceData[] }) => {
    const [offset, setOffset] = useState(0);

    // Content Loop Timer: Har 4 second mein data agle slot mein shift hoga
    useEffect(() => {
        const timer = setInterval(() => {
            setOffset((prev) => (prev + 1) % data.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [data.length]);

    return (
        <div className="maydiv-perspective-section">
            {/* Fan-Out Reveal Container: Center card pops, then neighbors slide out */}
            <motion.div
                className="fixed-depth-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
            >
                {[0, 1, 2, 3, 4].map((slotIndex) => {
                    const dataIndex = (slotIndex + offset) % data.length;
                    const item = data[dataIndex];
                    const Icon = item.icon;

                    // --- MAYDIV ACCURATE POSITIONING ---
                    const diff = slotIndex - 2;       // Center index 2 is 0
                    const absDiff = Math.abs(diff);

                    // 1. Spacing: More spread (220px keeps them airy)
                    const xPos = diff * 220;

                    // 2. Depth: Sides go back, Center is at front (0px)
                    const zPos = absDiff * -180;

                    // 3. Scaling: Center is biggest (1.1), Sides smaller
                    const scale = 1.15 - absDiff * 0.12;

                    // 4. Opacity: Edge cards fade out
                    const opacity = 1 - absDiff * 0.35;
                    const zIndex = 10 - absDiff;

                    return (
                        <motion.div
                            key={slotIndex}
                            variants={{
                                hidden: { opacity: 0, x: 0, z: -200, scale: 0.8 },
                                visible: {
                                    opacity: 1,
                                    x: xPos,
                                    z: zPos,
                                    scale: 1,
                                    transition: {
                                        type: 'spring',
                                        damping: 25,
                                        stiffness: 70,
                                        delay: absDiff * 0.2 // Middle (absDiff=0) first
                                    }
                                }
                            }}
                            whileHover={{
                                z: 120,
                                y: -40,
                                scale: 1.12,
                                transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }
                            }}
                            className="static-slot-frame"
                            style={{
                                '--sc': scale,
                                '--op': opacity,
                                '--zi': zIndex,
                                '--theme': item.color
                            } as React.CSSProperties}
                        >
                            <div className="content-slide-layer" key={dataIndex}>
                                <div className="icon-box-glow" style={{ background: `${item.color}15` }}>
                                    <Icon size={24} color={item.color} />
                                </div>
                                <h3 style={{ pointerEvents: 'none' }}>{item.title}</h3>
                                <p style={{ pointerEvents: 'none' }}>{item.desc}</p>
                                <div style={{ marginTop: 'auto' }}>
                                    <Link href="/services">
                                        <div className="explore-link" style={{ color: item.color, cursor: 'pointer' }}>
                                            Explore Expertise <ChevronRight size={14} />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <style>{`
        .maydiv-perspective-section {
          position: relative;
          width: 100%;
          height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 3000px;
          overflow: visible;
        }

        .fixed-depth-grid {
          position: relative;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        /* CARD FRAME: Premium Glassmorphism & Precise Gradient Border Aura */
        .static-slot-frame {
          position: absolute;
          width: 330px;
          height: 480px;
          background: linear-gradient(165deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 35px;
          backdrop-filter: blur(25px);
          opacity: var(--op);
          z-index: var(--zi);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transform-style: preserve-3d;
        }

        /* ANIMATED GRADIENT BORDER AURA */
        .static-slot-frame::before {
          content: "";
          position: absolute;
          inset: -1.5px;
          padding: 1.5px;
          border-radius: 35px;
          background: linear-gradient(90deg, #ff72e1, #c084fc, #818cf8, #38bdf8, #c084fc, #ff72e1);
          background-size: 300% 100%;
          animation: slideGradBorder 8s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.3;
          transition: opacity 0.4s ease;
        }

        @keyframes slideGradBorder { 
          0% { background-position: 0% 50%; } 
          100% { background-position: 300% 50%; } 
        }

        .static-slot-frame:hover::before {
          opacity: 1;
        }

        /* HOVER EFFECT: Combined with motion.div whileHover */
        .static-slot-frame:hover {
          z-index: 100 !important;
          opacity: 1;
          border-color: var(--theme);
          background: linear-gradient(165deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%);
          box-shadow: 
            inset 0 0 0 1px rgba(255, 255, 255, 0.15),
            0 40px 100px rgba(0,0,0,0.9), 
            0 0 40px var(--theme)40;
        }

        /* Smooth Flow Entry for Content Loop */
        .content-slide-layer {
          padding: 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Icon Box with Inner Radiance */
        .icon-box-glow {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          position: relative;
          box-shadow: inset 0 0 15px var(--theme)30;
          border: 1px solid var(--theme)40;
        }

        h3 { 
          background: linear-gradient(90deg, #ff72e1, #c084fc, #818cf8, #38bdf8, #c084fc, #ff72e1);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: slideGradText 8s linear infinite;
          
          font-size: 1.4rem; 
          margin-bottom: 14px; 
          font-weight: 700; 
          letter-spacing: -0.02em; 
        }

        @keyframes slideGradText { 
          0% { background-position: 0% 50%; } 
          100% { background-position: 300% 50%; } 
        }

        p { 
          color: rgba(255,255,255,0.9); 
          font-size: 0.95rem; 
          line-height: 1.7; 
          font-weight: 400;
        }

        /* Interactive Footer Link: Maydiv Style */
        .explore-link { 
          margin-top: auto; 
          display: flex; 
          align-items: center; 
          gap: 6px; 
          font-weight: 700; 
          font-size: 0.75rem; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          transition: all 0.3s ease;
        }

        .static-slot-frame:hover .explore-link {
          gap: 12px;
          letter-spacing: 0.15em;
        }
      `}</style>
        </div>
    );
};

export default StaticFrameContentLoop;