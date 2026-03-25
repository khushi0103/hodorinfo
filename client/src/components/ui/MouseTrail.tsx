import { useState, useEffect } from 'react';

export default function MouseTrail() {
  const [points, setPoints] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPoints((prev) => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Math.random() + Date.now() },
      ]);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {points.map((p, i) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: '6px',
            height: '6px',
            background: '#00d4ff',
            borderRadius: '50%',
            opacity: (i / points.length) * 0.5,
            transform: `scale(${i / points.length})`,
            filter: 'blur(2px)',
            transition: 'all 0.1s ease',
          }}
        />
      ))}
    </div>
  );
}
